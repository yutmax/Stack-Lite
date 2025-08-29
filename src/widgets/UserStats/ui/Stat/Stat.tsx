import "./Stat.scss";

interface StatProps {
  value: number;
  label: string;
}

const Stat = ({ value, label }: StatProps) => {
  return (
    <div className="stat">
      <span className="stat__value">{value}</span>
      <span className="stat__label">{label}</span>
    </div>
  );
};

export default Stat;
