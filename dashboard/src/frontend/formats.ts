export function formatPrice(value: string): string {
  const price = parseFloat(value);
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(price);
}
