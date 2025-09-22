export function formatMonthYear(value) {
  if (!value) return "—"; // empty case

  // If value is in YYYY-MM format, normalize it
  const normalized = /^\d{4}-\d{2}$/.test(value) ? `${value}-01` : value;

  const date = new Date(normalized);
  if (isNaN(date)) return "—"; // invalid case

  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}