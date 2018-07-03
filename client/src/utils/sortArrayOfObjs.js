const sortArrayOfObjs = (array, prop, type = "asc") => {
  let comparison = 0;

  const number1 = type === "asc" ? 1 : -1;
  const number2 = type === "asc" ? -1 : 1;

  const compare = (a, b) => {
    if (a[prop] > b[prop]) {
      comparison = number1;
    } else if (a[prop] < b[prop]) {
      comparison = number2;
    }
    return comparison;
  };

  return array.sort(compare);
};

export default sortArrayOfObjs;
