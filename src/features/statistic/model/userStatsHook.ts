import { useState, useEffect } from "react";
import type { Statistic } from "../../../widgets/UserStats/ui/UserStats";

interface UserStatsApiResponse {
  id: string;
  username: string;
  role: string;
  statistic: Statistic;
}

export const useUserStats = (userId: number | null) => {
  const [userStats, setUserStats] = useState<UserStatsApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`/api/users/${userId}/statistic`);
        if (!res.ok) throw new Error("Failed to fetch user statistics");
        const json = await res.json();
        setUserStats(json.data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userId]);

  return { userStats, loading, error };
};
