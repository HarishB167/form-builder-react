import ActionButton from "./actionButton";
import "./option.css";

const Option = ({
  data,
  optionNo,
  handleOptionChange,
  handleRemoveOption,
  handleOrderChange,
  isFirst,
  isLast,
}) => {
  const handleChange = (optionNo, e) => {
    if (handleOptionChange) handleOptionChange(optionNo, e);
  };

  const handleMoveUp = () => {
    handleOrderChange("up", optionNo);
  };

  const handleMoveDown = () => {
    handleOrderChange("down", optionNo);
  };

  return (
    <div className="option">
      <input
        type="text"
        disabled={data.startIdx !== null}
        value={data.text}
        placeholder={`Option ${optionNo}`}
        onChange={(e) => handleChange(optionNo, e)}
      />
      <div className="option__actions">
        {!isLast && (
          <ActionButton
            className="option__btnMoveDown"
            onClick={handleMoveDown}
            label="&#8681;"
          />
        )}
        {!isFirst && (
          <ActionButton
            className="option__btnMoveUp"
            onClick={handleMoveUp}
            label="&#8679;"
          />
        )}
        {data.startIdx === null && (
          <ActionButton
            className="option__btnRemove"
            onClick={() => handleRemoveOption(optionNo)}
            label="x"
          />
        )}
      </div>
    </div>
  );
};

export default Option;
