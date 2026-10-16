/** Format an ISO date (YYYY-MM-DD) as e.g. "October 2025". */
export function formatMonthYear(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}
