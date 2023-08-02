import { useState } from "react";
import "./comprehensionFillElement.css";

const QuestionFrame = ({ questionNo, qNo, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const getIcon = () => {
    return (
      <span
        className="comprehensionFillElement__btnCollapseToggle"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <i
          className={
            "fa-solid fa-chevron-down" + (isCollapsed ? " fa-rotate-270" : "")
          }
        ></i>
      </span>
    );
  };

  return (
    <div className="comprehensionFillElement__question">
      <div className="comprehensionFillElement__questionHeading">
        {getIcon()}
        Question {`${questionNo}.${qNo}`}
      </div>
      <div
        className={
          "comprehensionFillElement__content" +
          (isCollapsed ? "  comprehensionFillElement__displayNone" : "")
        }
      >
        <hr />
        {children}
      </div>
    </div>
  );
};

const ComprehensionFillElement = ({ questionNo, text, questions }) => {
  const renderTextQuestion = (question, qNo) => {
    return (
      <QuestionFrame questionNo={questionNo} question={question} qNo={qNo}>
        <div className="comprehensionFillElement__text">
          <div className="comprehensionFillElement__qText">{question.text}</div>
          <div className="comprehensionFillElement__answerInput">
            <textarea></textarea>
          </div>
        </div>
      </QuestionFrame>
    );
  };

  const renderSingleChoiceQ = (question, qNo) => {
    return (
      <QuestionFrame questionNo={questionNo} question={question} qNo={qNo}>
        <div className="comprehensionFillElement__mcq">
          <div className="comprehensionFillElement__qText">{question.text}</div>
          <div className="comprehensionFillElement__qOptions">
            {question.options.map((item, idx) => (
              <div>
                <input
                  type="radio"
                  id={`${questionNo}.${qNo}.${idx}`}
                  name={`${questionNo}.${qNo}`}
                />
                <label htmlFor={`${questionNo}.${qNo}.${idx}`}>{item}</label>
              </div>
            ))}
          </div>
        </div>
      </QuestionFrame>
    );
  };

  const renderMultipleChoiceQ = (question, qNo) => {
    return (
      <QuestionFrame questionNo={questionNo} question={question} qNo={qNo}>
        <div className="comprehensionFillElement__mcq">
          <div className="comprehensionFillElement__qText">{question.text}</div>
          <div className="comprehensionFillElement__qOptions">
            {question.options.map((item, idx) => (
              <div>
                <input type="checkbox" id={`${questionNo}.${qNo}.${idx}`} />{" "}
                <label htmlFor={`${questionNo}.${qNo}.${idx}`}>{item}</label>
              </div>
            ))}
          </div>
        </div>
      </QuestionFrame>
    );
  };

  return (
    <div className="comprehensionFillElement">
      <div className="comprehensionFillElement__header">
        Question {questionNo}
      </div>
      <div className="comprehensionFillElement__text">{text}</div>
      {questions.map((qItem, idx) => {
        if (qItem.type === "MCQ" && qItem.correctOptions.length === 1)
          return renderSingleChoiceQ(qItem, idx + 1);
        else if (qItem.type === "MCQ" && qItem.correctOptions.length > 1)
          return renderMultipleChoiceQ(qItem, idx + 1);
        else if (qItem.type === "Text")
          return renderTextQuestion(qItem, idx + 1);
        else {
          return <div>Unknown question type : {qItem.type}</div>;
        }
      })}
    </div>
  );
};

export default ComprehensionFillElement;
