import { useState } from "react";
import QuestionContainer from "./questionContainer";
import "./mcq.css";

const MCQ = ({
  questionNo,
  question,
  qNo,
  selectedOptions,
  handleAnswerChange,
}) => {
  const [options, setOptions] = useState([]);

  const isChecked = (optionNo) => {
    return selectedOptions
      ? selectedOptions.some((item) => item === optionNo)
      : false;
  };

  const handleRadioChange = (optionNo) => {
    const ops = [...options];
    const idx = ops.findIndex((item) => item === optionNo);

    if (idx === -1) ops.push(optionNo);
    else ops.splice(idx, 1);

    setOptions(ops);
    handleAnswerChange(ops);
  };

  return (
    <QuestionContainer questionNo={questionNo} qNo={qNo}>
      <div className="mcq">
        <div className="mcq__qText">{question.text}</div>
        <div className="mcq__qOptions">
          {question.options.map((item, idx) => (
            <div key={idx}>
              <input
                type="checkbox"
                id={`${questionNo}.${qNo}.${idx}`}
                checked={isChecked(idx + 1)}
                onChange={(e) => handleRadioChange(idx + 1)}
              />
              <label htmlFor={`${questionNo}.${qNo}.${idx}`}>{item}</label>
            </div>
          ))}
        </div>
      </div>
    </QuestionContainer>
  );
};

export default MCQ;
