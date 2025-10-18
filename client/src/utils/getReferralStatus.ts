// client/src/utils/getReferralStatus.ts

export interface ReferralStatus {
  count: number;
}

// Simulated/fallback version
export async function getReferralStatus(userId: string): Promise<ReferralStatus> {
  try {
    // Example: fetch from your backend API if you have one
    const response = await fetch(`/api/getReferralStatus?userId=${userId}`);
    if (!response.ok) throw new Error("Failed to fetch referral status");
    const data = await response.json();
    
    // Make sure it always returns a 'count' number
    return { count: data.count ?? 0 };
  } catch (err) {
    console.warn("Could not fetch referral status, defaulting to 0", err);
    return { count: 0 };
  }
}
