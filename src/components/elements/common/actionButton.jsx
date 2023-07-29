import "./actionButton.css";

const ActionButton = ({ className, onClick, label }) => {
  const clsName = "btn-action " + className;
  return (
    <button className={clsName} onClick={onClick}>
      {label}
    </button>
  );
};

export default ActionButton;
