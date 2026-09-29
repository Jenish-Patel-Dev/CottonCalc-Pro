Add-Type -AssemblyName System.Drawing

$projectDir = (Get-Item $PSScriptRoot).Parent.FullName
$sourceFile = Join-Path $projectDir "public\assets\logos\logo-light-icon.png"

Write-Output "Loading source: $sourceFile"
$src = [System.Drawing.Image]::FromFile($sourceFile)

# Content bounding box from earlier scan:
$srcX = 84
$srcY = 28
$srcW = 855
$srcH = 635

function Create-Icon {
    param(
        [string]$OutFile,
        [int]$CanvasSize,
        [double]$ScaleFactor, # fraction of canvas width for content
        [System.Drawing.Color]$BgColor
    )

    $bmp = New-Object System.Drawing.Bitmap($CanvasSize, $CanvasSize, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    if ($BgColor.A -gt 0) {
        $brush = New-Object System.Drawing.SolidBrush($BgColor)
        $g.FillRectangle($brush, 0, 0, $CanvasSize, $CanvasSize)
        $brush.Dispose()
    } else {
        $g.Clear([System.Drawing.Color]::Transparent)
    }

    # Target dimensions
    $targetW = [int][math]::Round($CanvasSize * $ScaleFactor)
    $targetH = [int][math]::Round($targetW * ($srcH / $srcW))
    $targetX = [int][math]::Round(($CanvasSize - $targetW) / 2)
    $targetY = [int][math]::Round(($CanvasSize - $targetH) / 2)

    $destRect = New-Object System.Drawing.Rectangle($targetX, $targetY, $targetW, $targetH)
    $g.DrawImage($src, $destRect, $srcX, $srcY, $srcW, $srcH, [System.Drawing.GraphicsUnit]::Pixel)

    $g.Dispose()

    $fullOut = Join-Path $projectDir $OutFile
    $bmp.Save($fullOut, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()

    Write-Output "Created: $OutFile ($CanvasSize x $CanvasSize)"
}

# 1. Standard Icons (purpose: "any") - Transparent background, fits 86% width
Create-Icon -OutFile "public\icon-512.png" -CanvasSize 512 -ScaleFactor 0.86 -BgColor ([System.Drawing.Color]::Transparent)
Create-Icon -OutFile "public\icon-192.png" -CanvasSize 192 -ScaleFactor 0.86 -BgColor ([System.Drawing.Color]::Transparent)

# 2. Apple Touch Icon - 180x180, 80% width, transparent / clean white
Create-Icon -OutFile "public\apple-touch-icon.png" -CanvasSize 180 -ScaleFactor 0.80 -BgColor ([System.Drawing.Color]::Transparent)

# 3. Maskable Icons (purpose: "maskable") - Fits strictly within safe zone (62% width), clean white background
Create-Icon -OutFile "public\icon-maskable-512.png" -CanvasSize 512 -ScaleFactor 0.62 -BgColor ([System.Drawing.Color]::FromArgb(255, 255, 255, 255))
Create-Icon -OutFile "public\icon-maskable-192.png" -CanvasSize 192 -ScaleFactor 0.62 -BgColor ([System.Drawing.Color]::FromArgb(255, 255, 255, 255))

$src.Dispose()
Write-Output "All icons successfully created!"
