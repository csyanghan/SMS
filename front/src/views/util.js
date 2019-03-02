export const formateTime = (date) => {
  let dateObj = new Date(date);
  return dateObj.getFullYear() + '年' + (dateObj.getMonth() + 1) + '月' + dateObj.getDate() + '日';
}
