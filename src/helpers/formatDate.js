import { months } from "../Data/months";

export const formatDate = (date) => {
  let [y, m, d] = date.split("-");
  m = parseInt(m);
  return `${d} ${months[m]} ${y}`;
};
