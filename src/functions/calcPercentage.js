export const calculateDiscountPercentage=(oldPrice, newPrice) => {
    const discount = oldPrice - newPrice;
    const percentage = (discount / oldPrice) * 100;
    return Math.round(percentage);
}