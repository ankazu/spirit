export function currency(num) {
  let number = 0;
  if (num) {
    const n = num.toString().split('.');
    number = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return number;
}

export function date(time) {
  const localDate = new Date(time * 1000);
  return localDate.toLocaleDateString();
}
