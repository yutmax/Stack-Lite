import "./FullPageError.scss";

type FullPageErrorProps = {
  message: string;
};

const FullPageError = ({ message }: FullPageErrorProps) => {
  return (
    <div className="full-page-error">
      <h1 className="full-page-error__text">Error: {message}</h1>
    </div>
  );
};

export default FullPageError;
