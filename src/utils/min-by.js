export default function minBy(array, key) {
  const sortedArray = [...array];

  sortedArray.sort((a, b) => {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  });

  return sortedArray.shift();
}
