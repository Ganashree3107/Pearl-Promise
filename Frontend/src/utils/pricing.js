export function toPriceNumber(value) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value !== "string") return null;

  const parsed = Number(value.replace(/[^\d.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : null;
}

export function getDiscountPercent(priceValue, originalPriceValue) {
  const price = toPriceNumber(priceValue);
  const originalPrice = toPriceNumber(originalPriceValue);

  if (price === null || originalPrice === null || originalPrice <= price) {
    return null;
  }

  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

export function getProductDiscount(product) {
  return getDiscountPercent(
    product.price,
    product.originalPrice ?? product.original_price
  );
}
