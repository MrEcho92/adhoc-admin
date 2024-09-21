export function formattedDate(date: Date) {
  return date.toISOString().split("T")[0];
}
