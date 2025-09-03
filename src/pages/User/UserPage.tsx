import { useParams } from "react-router-dom";
import { useUserStats } from "../../features/statistic/model/userStatsHook";
import UserStats from "../../widgets/UserStats/ui/UserStats";

const UserPage = () => {
  const userId = useParams().id;
  const { userStats, error, loading } = useUserStats(Number(userId));
  return (
    <div className="user-page">
      <div className="user-page__container">
        {userStats && (
          <UserStats
            userStatistic={{
              user: {
                id: typeof userStats.id === "string" ? Number(userStats.id) : userStats.id,
                username: userStats.username,
                role: userStats.role,
              },
              statistic: userStats.statistic,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default UserPage;
