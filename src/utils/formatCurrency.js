/**
 * Format angka ke format Rupiah
 * @param {number} amount
 * @param {boolean} compact - Gunakan format singkat (1.2 Jt)
 */
export function formatCurrency(amount, compact = false) {
  if (amount === null || amount === undefined) return "Rp 0";

  if (compact) {
    if (amount >= 1_000_000_000) return `Rp ${(amount / 1_000_000_000).toFixed(1)} M`;
    if (amount >= 1_000_000) return `Rp ${(amount / 1_000_000).toFixed(1)} Jt`;
    if (amount >= 1_000) return `Rp ${(amount / 1_000).toFixed(0)} Rb`;
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(n) {
  if (!n && n !== 0) return "-";
  return new Intl.NumberFormat("id-ID").format(n);
}