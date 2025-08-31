import SecuritySettings from "../../widgets/SecuritySettings/ui/SecuritySettings";
import UserStats from "../../widgets/UserStats/ui/UserStats";
import "./AccountPage.scss";
import { useSelector } from "react-redux";
import { selectUser } from "../../entities/user/model/selectors";
import { CircularProgress } from "@mui/material";
import { useUserStats } from "../../features/statistic/model/userStatsHook";
import { useUpdateMe } from "../../features/security/model/useUpdateMe";

const AccountPage = () => {
  const userId = useSelector(selectUser).id;
  const { userStats, loading, error: statsError } = useUserStats(userId);

  return (
    <div className="account-page">
      <div className="account-page__container">
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {statsError && <div className="account-page__error">{statsError}</div>}
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
