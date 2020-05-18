export const range = (start: number, end: number): number[] => {
  return [...Array(end).fill(0)].map((el, index) => (el = index + start));
};
