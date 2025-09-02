import "./EmptyState.scss";

interface EmptyStateProps {
  message: string;
}

const EmptyState = ({ message }: EmptyStateProps) => {
  return <div className="empty-state">{message}</div>;
};

export default EmptyState;
