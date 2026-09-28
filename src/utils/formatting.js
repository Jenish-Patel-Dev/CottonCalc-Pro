/**
 * Formatting helpers to match original code display behavior
 */

export function formatCurrency(value) {
  const num = parseInt(value, 10);
  if (isNaN(num)) return '0';
  return num.toLocaleString();
}
