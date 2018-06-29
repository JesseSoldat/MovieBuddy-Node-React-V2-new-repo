const hasOwnProp = (obj, prop) => {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};

export default hasOwnProp;
