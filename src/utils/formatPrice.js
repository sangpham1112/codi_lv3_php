export const formatPrice = (price) => {
  let formattedPrice = Number(price).toLocaleString("vi", {
    style: "currency",
    currency: "VND",
  });
  return formattedPrice;
};
