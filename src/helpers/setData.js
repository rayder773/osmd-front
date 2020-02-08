export const setDate = date => {
  const formatedDate = new Date(date);

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: 'numeric',
  };

  return formatedDate.toLocaleDateString(options);
};

