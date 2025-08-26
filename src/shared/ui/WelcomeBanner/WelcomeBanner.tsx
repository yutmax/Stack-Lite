import "./WelcomeBanner.scss";

type WelcomeBannerProps = {
  username: string;
};

const WelcomeBanner = ({ username }: WelcomeBannerProps) => {
  return (
    <div className="welcome-banner">
      <h2 className="welcome-banner__title">Welcome to Stack Lite, {username}!</h2>
      <p className="welcome-banner__text">Find answers to your technical questions and help others answer theirs.</p>
    </div>
  );
};

export default WelcomeBanner;
