import { useState, useRef } from "react";
import ElementContainer from "./common/elementContainer";
import Button from "./common/button";
import Option from "./common/option";
import ImagePicker from "./common/imagePicker";
import "./clozeElement.css";
import { useEffect } from "react";
import DraggableList from "../../utils/draggableList";
import ActionButton from "./common/actionButton";

const ClozeElement = ({ data, handleQuestionDataChange }) => {
  const isDataValid = () => {
    if (
      data.hasOwnProperty("questionType") &&
      data.hasOwnProperty("image") &&
      data.hasOwnProperty("imageData") &&
      data.hasOwnProperty("text") &&
      data.hasOwnProperty("options") &&
      data.hasOwnProperty("maskingRanges")
    )
      return true;
    return false;
  };

  const [isCollapsed, setIsCollapsed] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    handleQuestionDataChange({
      questionType: "cloze",
      image: "",
      imageData: "",
      text: "",
      options: [],
      maskingRanges: [],
    });
  }, []);

  const handleImagePicked = (e) => {
    handleQuestionDataChange({ ...data, image: e.target.value });

    let imgData = "";
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);

      reader.addEventListener("load", () => {
        imgData = reader.result;
        handleQuestionDataChange({
          ...data,
          image: e.target.value,
          imageData: imgData,
        });
      });
    }
  };

  const handleTextChange = (e) => {
    handleQuestionDataChange({ ...data, text: e.target.value });
  };

  const handleUnderline = (e) => {
    const input = inputRef.current;
    const selectionStart = input.selectionStart;
    const selectionEnd = input.selectionEnd;
    if (selectionStart === selectionEnd) return;

    const newMaskingRanges = [
      ...data.maskingRanges,
      [selectionStart, selectionEnd],
    ];

    const newOption = data.text.substring(selectionStart, selectionEnd);
    const newOptions = [
      ...data.options,
      { text: newOption, startIdx: selectionStart },
    ];
    handleQuestionDataChange({
      ...data,
      options: newOptions,
      maskingRanges: newMaskingRanges,
    });
  };

  const handleAddOption = () => {
    const newOptions = [...data.options, { text: "", startIdx: null }];
    handleQuestionDataChange({ ...data, options: newOptions });
  };

  const handleOptionRemove = (optionNo) => {
    const opts = [...data.options];
    opts.splice(optionNo - 1, 1);
    handleQuestionDataChange({ ...data, options: opts });
  };

  const handleOptionChange = (optionNo, e) => {
    const opts = [...data.options];
    opts[optionNo - 1].text = e.target.value;
    handleQuestionDataChange({ ...data, options: opts });
  };

  const handleRemoveMask = (maskIdx) => {
    if (data.maskingRanges.length > 0) {
      const idx = data.options.findIndex(
        (item) =>
          data.maskingRanges[maskIdx] &&
          item.startIdx === data.maskingRanges[maskIdx][0]
      );
      handleOptionRemove(idx + 1);
    }

    const masks = [...data.maskingRanges];
    masks.splice(maskIdx, 1);
    handleQuestionDataChange({ ...data, maskingRanges: masks });
  };

  const getPreview = () => {
    const previewTxt = [];

    const getMaskIndex = (index) => {
      for (var i = 0; i < data.maskingRanges.length; i++) {
        const range = data.maskingRanges[i];
        if (index >= range[0] && index < range[1]) return i;
      }
      return -1;
    };

    for (var i = 0; i < data.text.length; i++) {
      const maskIdx = getMaskIndex(i);
      const className = maskIdx > -1 ? "clozeElement_underline" : "";
      previewTxt.push(
        <span
          className={className}
          key={i}
          onClick={() => (maskIdx > -1 ? handleRemoveMask(maskIdx) : {})}
        >
          {data.text.charAt(i)}
        </span>
      );
    }
    return previewTxt;
  };

  const handleOnOptionDragEnd = (result) => {
    if (!result.destination) return;

    const iList = [...data.options];
    const [reorderedItem] = iList.splice(result.source.index, 1);
    iList.splice(result.destination.index, 0, reorderedItem);
    handleQuestionDataChange({ ...data, options: iList });
  };

  if (!isDataValid()) {
    return null;
  }

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
            value={data.text}
            onChange={handleTextChange}
          />
          <Button onClick={handleUnderline} label="Underline" />
        </div>
        <div className="clozeElement__line__image">
          <ImagePicker
            label="Media: "
            image={data.image}
            onChange={handleImagePicked}
          />
        </div>
        <Button onClick={handleAddOption} label="Add Option" />
        <DraggableList
          className="clozeElement__options"
          itemClassName="clozeElement__option"
          droppableId="options"
          items={data.options}
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
