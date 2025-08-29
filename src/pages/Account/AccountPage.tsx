import SecuritySettings from "../../widgets/SecuritySettings/ui/SecuritySettings";
import UserStats from "../../widgets/UserStats/ui/UserStats";
import "./AccountPage.scss";

const AccountPage = () => {
  return (
    <div className="account-page">
      <div className="account-page__container">
        <UserStats />
        <SecuritySettings />
      </div>
    </div>
  );
};
export default AccountPage;
