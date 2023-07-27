import { useEffect } from "react";
import { useState, useRef } from "react";
import "./clozeElement.css";

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
    <div className="clozeElement__option">
      <input
        type="text"
        disabled={data.startIdx !== null}
        value={data.text}
        placeholder={`Option ${optionNo}`}
        onChange={(e) => handleChange(optionNo, e)}
      />
      {data.startIdx === null && (
        <button onClick={() => handleRemoveOption(optionNo)}>x</button>
      )}
      {!isFirst && <button onClick={handleMoveUp}>&#8679;</button>}
      {!isLast && <button onClick={handleMoveDown}>&#8681;</button>}
    </div>
  );
};

const ClozeElement = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [options, setOptions] = useState([]);
  const [maskingRanges, setMaskingRanges] = useState([]);

  const inputRef = useRef(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleUnderline = (e) => {
    const input = inputRef.current;
    const selectionStart = input.selectionStart;
    const selectionEnd = input.selectionEnd;
    if (selectionStart === selectionEnd) return;

    setMaskingRanges([...maskingRanges, [selectionStart, selectionEnd]]);

    const newOption = text.substring(selectionStart, selectionEnd);
    setOptions([...options, { text: newOption, startIdx: selectionStart }]);
  };

  const handleAddOption = () => {
    setOptions([...options, { test: "", startIdx: null }]);
  };

  const handleOptionRemove = (optionNo) => {
    const opts = [...options];
    opts.splice(optionNo - 1, 1);
    setOptions(opts);
  };

  const handleOptionChange = (optionNo, e) => {
    const opts = [...options];
    opts[optionNo - 1].text = e.target.value;
    setOptions(opts);
  };

  const handleOptionOrderChange = (direction, optionNo) => {
    const idx = optionNo - 1;
    const opts = [...options];
    if (direction == "up")
      [opts[idx], opts[idx - 1]] = [opts[idx - 1], opts[idx]];
    else if (direction == "down")
      [opts[idx], opts[idx + 1]] = [opts[idx + 1], opts[idx]];

    setOptions([...opts]);
  };

  const handleRemoveMask = (maskIdx) => {
    const masks = [...maskingRanges];
    masks.splice(maskIdx, 1);
    setMaskingRanges([...masks]);
  };

  const getPreview = () => {
    const previewTxt = [];

    const getMaskIndex = (index) => {
      for (var i = 0; i < maskingRanges.length; i++) {
        const range = maskingRanges[i];
        if (index >= range[0] && index < range[1]) return i;
      }
      return -1;
    };

    for (var i = 0; i < text.length; i++) {
      const maskIdx = getMaskIndex(i);
      const className = maskIdx > -1 ? "clozeElement_underline" : "";
      previewTxt.push(
        <span
          className={className}
          key={i}
          onClick={() => handleRemoveMask(maskIdx)}
        >
          {text.charAt(i)}
        </span>
      );
    }

    return previewTxt;
  };

  return (
    <div className="clozeElement">
      <div className="clozeElement__line">
        <span>Preview</span>
        <div className="clozeElement__preview">{getPreview()}</div>
      </div>
      <div className="clozeElement__line">
        <span>Sentence</span>
        <input
          type="text"
          ref={inputRef}
          value={text}
          onChange={handleTextChange}
        />
        <button
          className="clozeElement__btnUnderline"
          onClick={handleUnderline}
        >
          Underline
        </button>
      </div>
      <div className="clozeElement__line__image">
        <span>Add Image (Optional): </span>
        <input
          type="file"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <div className="clozeElement__options">
        <button
          className="clozeElement__options__addOption"
          onClick={handleAddOption}
        >
          Add Option
        </button>
        {options.map((item, idx) => (
          <Option
            key={idx}
            data={item}
            optionNo={idx + 1}
            handleOptionChange={handleOptionChange}
            handleRemoveOption={handleOptionRemove}
            handleOrderChange={handleOptionOrderChange}
            isLast={options.length === idx + 1}
            isFirst={idx === 0}
          />
        ))}
      </div>
    </div>
  );
};

export default ClozeElement;
