export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString();
}

export function truncate(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}