export const formatPrice = (price) => {
  return Intl.NumberFormat("vi-VN").format(price);
};
