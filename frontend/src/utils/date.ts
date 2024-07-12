export function isToday(date: Date) {
  const today = new Date();

  return today.toDateString() === date.toDateString();
}

export function prettifyDate(date: string | Date) {
  const parsedDate = new Date(date);

  return isToday(parsedDate)
    ? parsedDate.toLocaleTimeString([], { hourCycle: "h12", timeStyle: "short" })
    : ``;
}
