import { useId } from "react";
import SecuritySettings from "../../widgets/SecuritySettings/ui/SecuritySettings";
import UserStats from "../../widgets/UserStats/ui/UserStats";
import "./AccountPage.scss";
import { useSelector } from "react-redux";
import { selectUser } from "../../entities/user/model/selectors";
import { CircularProgress } from "@mui/material";
import { useUserStats } from "../../features/statistic/model/userStatsHook";

const AccountPage = () => {
  const userId = useSelector(selectUser).id;
  const { userStats, loading, error } = useUserStats(userId);

  return (
    <div className="account-page">
      <div className="account-page__container">
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {error && <div className="account-page__error">{error}</div>}
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
            <SecuritySettings />
          </>
        )}
      </div>
    </div>
  );
};
export default AccountPage;
