const getQueryParams = (string, location) => {
  const params = new URLSearchParams(location);
  return params.get(string);
};

export default getQueryParams;
