export function trackReferral(): { count: number } {
  const current = parseInt(localStorage.getItem("referralCount") || "0", 10);
  const updated = current + 1;
  localStorage.setItem("referralCount", updated.toString());
  return { count: updated };
}
