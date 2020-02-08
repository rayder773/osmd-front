export const formatCurrency = (number, currency = null) => {
  if (typeof number !== 'number') {
    number = parseFloat(number);
  }
  if (isNaN(number)) {
    number = 0;
  }
  let result = number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ');
  if (currency && typeof currency === 'string') {
    result += ` ${currency}`;
  }
  return result;
};
