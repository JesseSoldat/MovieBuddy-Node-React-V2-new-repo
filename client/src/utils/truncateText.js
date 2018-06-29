const truncateText = (text = "", amount = 21) =>
  text.length >= amount ? text.slice(0, amount) + "..." : text;

export default truncateText;
