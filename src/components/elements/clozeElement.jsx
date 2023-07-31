import { useState, useRef } from "react";
import ElementContainer from "./common/elementContainer";
import Button from "./common/button";
import Option from "./common/option";
import ImagePicker from "./common/imagePicker";
import "./clozeElement.css";
import { useEffect } from "react";
import DraggableList from "../../utils/draggableList";
import ActionButton from "./common/actionButton";

const ClozeElement = ({ handleQuestionDataChange }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [options, setOptions] = useState([]);
  const [maskingRanges, setMaskingRanges] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const inputRef = useRef(null);

  useEffect(() => {
    handleQuestionDataChange({
      questionType: "cloze",
      image,
      text,
      options,
      maskingRanges,
    });
  }, [text, image, options, maskingRanges]);

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
    setOptions([...options, { text: "", startIdx: null }]);
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
    if (direction === "up")
      [opts[idx], opts[idx - 1]] = [opts[idx - 1], opts[idx]];
    else if (direction === "down")
      [opts[idx], opts[idx + 1]] = [opts[idx + 1], opts[idx]];

    setOptions([...opts]);
  };

  const handleRemoveMask = (maskIdx) => {
    if (maskingRanges.length > 0) {
      const idx = options.findIndex(
        (item) =>
          maskingRanges[maskIdx] && item.startIdx === maskingRanges[maskIdx][0]
      );
      handleOptionRemove(idx + 1);
    }

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
          onClick={() => (maskIdx > -1 ? handleRemoveMask(maskIdx) : {})}
        >
          {text.charAt(i)}
        </span>
      );
    }
    return previewTxt;
  };

  const handleOnOptionDragEnd = (result) => {
    if (!result.destination) return;

    const iList = [...options];
    const [reorderedItem] = iList.splice(result.source.index, 1);
    iList.splice(result.destination.index, 0, reorderedItem);
    setOptions(iList);
  };

  return (
    <ElementContainer>
      <div className="clozeElement__headingLine">
        <div className="clozeElement__heading">Cloze Element</div>
        <Button
          onClick={() => setIsCollapsed(!isCollapsed)}
          label={isCollapsed ? "+" : "-"}
        />
      </div>
      <div className={isCollapsed ? "elementHidden" : "elementContent"}>
        <div className="clozeElement__line">
          <span className="clozeElement__label">Preview</span>
          <div className="clozeElement__preview">{getPreview()}</div>
        </div>
        <div className="clozeElement__line">
          <span className="clozeElement__label">Sentence</span>
          <textarea
            className="clozeElement__input"
            type="text"
            ref={inputRef}
            value={text}
            onChange={handleTextChange}
          />
          <Button onClick={handleUnderline} label="Underline" />
        </div>
        <div className="clozeElement__line__image">
          <ImagePicker
            label="Media: "
            image={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <Button onClick={handleAddOption} label="Add Option" />
        <DraggableList
          className="clozeElement__options"
          itemClassName="clozeElement__option"
          droppableId="options"
          items={options}
          handleOnDragEnd={handleOnOptionDragEnd}
          renderListItemChild={(item, index) => (
            <>
              <input
                type="text"
                disabled={item.startIdx !== null}
                value={item.text}
                placeholder={`Option ${index + 1}`}
                onChange={(e) => handleOptionChange(index + 1, e)}
              />
              {item.startIdx === null && (
                <ActionButton
                  className="clozeElement__option__btnRemove"
                  onClick={() => handleOptionRemove(index + 1)}
                  label="x"
                />
              )}
            </>
          )}
        />
      </div>
    </ElementContainer>
  );
};

export default ClozeElement;
