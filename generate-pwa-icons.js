import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createPng(width, height, colorR, colorG, colorB) {
  // Construct raw RGBA bitmap with rounded circle/border
  const bytesPerPixel = 4;
  const stride = width * bytesPerPixel;
  const raw = Buffer.alloc(height * (stride + 1));

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = width * 0.42;

  let offset = 0;
  for (let y = 0; y < height; y++) {
    raw[offset++] = 0; // Filter byte 0 (None)
    for (let x = 0; x < width; x++) {
      const dx = x - centerX;
      const dy = y - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Icon badge styling
      if (dist <= radius) {
        // Cotton / Factory emblem in center
        const inCenterBox =
          Math.abs(dx) < width * 0.22 &&
          Math.abs(dy) < height * 0.22;

        if (inCenterBox && (Math.abs(dx) < width * 0.16 || Math.abs(dy) < height * 0.16)) {
          // White emblem
          raw[offset++] = 255;
          raw[offset++] = 255;
          raw[offset++] = 255;
          raw[offset++] = 255;
        } else {
          // Indigo primary
          raw[offset++] = colorR;
          raw[offset++] = colorG;
          raw[offset++] = colorB;
          raw[offset++] = 255;
        }
      } else {
        // Transparent outside radius
        raw[offset++] = 0;
        raw[offset++] = 0;
        raw[offset++] = 0;
        raw[offset++] = 0;
      }
    }
  }

  const deflated = zlib.deflateSync(raw);

  // CRC32 helper
  function crc32(buf) {
    let c;
    const table = [];
    for (let n = 0; n < 256; n++) {
      c = n;
      for (let k = 0; k < 8; k++) {
        c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
      }
      table[n] = c;
    }
    let crc = 0 ^ (-1);
    for (let i = 0; i < buf.length; i++) {
      crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
    }
    return (crc ^ (-1)) >>> 0;
  }

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.alloc(4);
    const toCrc = Buffer.concat([typeBuf, data]);
    crcBuf.writeUInt32BE(crc32(toCrc), 0);
    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }

  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type 6 (RGBA)
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', deflated);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate PNG icons
const icon192 = createPng(192, 192, 67, 56, 202); // #4338ca
const icon512 = createPng(512, 512, 67, 56, 202);

fs.writeFileSync(path.join(publicDir, 'icon-192.png'), icon192);
fs.writeFileSync(path.join(publicDir, 'icon-512.png'), icon512);
fs.writeFileSync(path.join(publicDir, 'icon-maskable-192.png'), icon192);
fs.writeFileSync(path.join(publicDir, 'icon-maskable-512.png'), icon512);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), icon192);

console.log('PWA PNG Icons successfully generated in public/ directory!');
