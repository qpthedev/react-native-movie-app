export const trimText = (text, limit) =>
  text.length > limit ? `${text.slice(0, limit)}...` : text;

export const formatDate = (date) => {
  const theDate = new Date(date);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return theDate.toLocaleDateString("en-us", options);
};
