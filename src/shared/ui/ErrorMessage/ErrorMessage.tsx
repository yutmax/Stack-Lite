import "./ErrorMessage.scss";

interface ErrorMessageProps {
  message: string;
}
const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <div className="error-message">Error: {message}</div>;
};
export default ErrorMessage;
