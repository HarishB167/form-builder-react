import { useState } from "react";
import "./questionContainer.css";

const QuestionContainer = ({ questionNo, qNo, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const getIcon = () => {
    return (
      <span
        className="questionContainer__btnCollapseToggle"
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
    <div className="questionContainer__question">
      <div className="questionContainer__questionHeading">
        {getIcon()}
        Question {`${questionNo}.${qNo}`}
      </div>
      <div
        className={
          "questionContainer__content" +
          (isCollapsed ? "  questionContainer__displayNone" : "")
        }
      >
        <hr />
        {children}
      </div>
    </div>
  );
};

export default QuestionContainer;
