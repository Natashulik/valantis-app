export const formatedPrice = (price) => {
  const formatter = new Intl.NumberFormat("ru-RU", {
    style: "decimal",
    currency: "RUB",
  });
  return formatter.format(price);
};
