export const calDiscount = (price, discount) => {
  const finalAmount = price - (price * discount) / 100;
  return finalAmount;
};
