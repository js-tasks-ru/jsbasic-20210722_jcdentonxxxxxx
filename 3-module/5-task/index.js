function getMinMax(str) {
  let arr = str.split(' ');

  arr = arr.filter((item) => {
    return parseFloat(item);
  });

  return {
    min: Math.min(...arr),
    max: Math.max(...arr),
  };
}
