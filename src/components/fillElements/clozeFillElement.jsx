import React, { useEffect } from "react";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DroppableBasicList from "../../utils/droppableBasicList";
import "./clozeFillElement.css";

const ClozeFillElement = ({
  text,
  maskingRanges,
  options,
  questionNo,
  handleAnswerDataChange,
  answerData,
}) => {
  const setInitalStateAnswerInputs = () => {
    const data = {};
    maskingRanges.forEach((m, idx) => {
      data[idx] = [];
    });
    return data;
  };

  const setInitialStateOptions = () => {
    return options.map((i) => i);
  };

  const [answer, setAnswer] = useState(setInitalStateAnswerInputs());
  const [optionsList, setOptionsList] = useState(setInitialStateOptions());

  useEffect(() => {});

  const getCleanMaskingRanges = () => {
    const data = maskingRanges.sort((a, b) => {
      if (a[0] < b[0]) return -1;
      else if (a[0] > b[0]) return 1;
      else if (a[0] === b[0]) return 0;
    });
    return data;
  };

  const getSubstring = (item, idx) => {
    if (idx === 0) return text.substring(0, item[0]);
    else return text.substring(maskingRanges[idx - 1][1], item[0]);
  };

  useEffect(() => {
    const data = getCleanMaskingRanges();
  });

  const handleOnDragEnd = (result) => {
    console.log("result :>> ", result);

    if (!result.destination) return;
    if (result.destination.droppableId === result.source.droppableId) return;

    const ans = { ...answer };

    if (result.source.droppableId === "options") {
      const newOptions = [...optionsList];
      const option = newOptions.splice(result.source.index, 1)[0];
      const destination = parseInt(
        result.destination.droppableId.replace("Input_", "")
      );
      if (ans[destination].length > 0) {
        const destIndex = result.destination.index;
        const otherOption = ans[destination].splice(destIndex, 1)[0];
        newOptions.push(otherOption);
      }
      ans[destination].push(option);
      setOptionsList(newOptions);
      setAnswer(ans);
    } else if (result.destination.droppableId !== "options") {
      const source = parseInt(result.source.droppableId.replace("Input_", ""));
      const sourceIndex = result.source.index;
      const destination = parseInt(
        result.destination.droppableId.replace("Input_", "")
      );
      const option = ans[source].splice(sourceIndex, 1)[0];
      if (ans[destination].length > 0) {
        const destIndex = result.destination.index;
        const otherOption = ans[destination].splice(destIndex, 1)[0];
        ans[source].push(otherOption);
      }
      ans[destination].push(option);
      setAnswer(ans);
    }
  };

  useEffect(() => {
    handleAnswerDataChange({ questionType: "cloze", answer });
  }, [answer]);

  return (
    <div className="clozeFillElement">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="clozeFillElement__header">Question {questionNo}</div>
        <DroppableBasicList
          className="clozeFillElement__optionContainer"
          direction="horizontal"
          itemClassName="clozeFillElement__option"
          droppableId="options"
          items={optionsList}
          renderListItemChild={(item, index) => (
            <span key={index}>{item.text}</span>
          )}
        />
        <div className="clozeFillElement__answerArea">
          {maskingRanges.map((item, idx) => (
            <React.Fragment key={idx}>
              <span className="clozeFillElement__partText">
                {getSubstring(item, idx)}
              </span>
              <DroppableBasicList
                className="clozeFillElement__input"
                itemClassName=""
                droppableId={"Input_" + idx}
                items={answer[idx]}
                renderListItemChild={(item, index) => (
                  <span key={index}>{item.text}</span>
                )}
              />
            </React.Fragment>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default ClozeFillElement;
