import "./SuccessMessage.scss";

interface SuccessMessageProps {
  message: string;
}
const SuccessMessage = ({ message }: SuccessMessageProps) => {
  return <div className="success-message">{message}</div>;
};

export default SuccessMessage;
