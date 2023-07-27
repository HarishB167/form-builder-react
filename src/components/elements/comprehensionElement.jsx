import { useState } from "react";
import NewQuestion from "./comprehensionQuestions/newQuestion";
import Question from "./comprehensionQuestions/question";
import "./comprehensionElement.css";

const ComprehensionElement = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleAddQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  return (
    <div className="comprehensionElement">
      <div className="comprehensionElement__topLine">
        <span>Question</span>
        <span>Comprehension</span>
        <span>Points</span>
        <button onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? "+" : "-"}
        </button>
      </div>
      <div className="comprehensionElement__text">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      {!isCollapsed && (
        <>
          <div className="comprehensionElement__image">
            <span>Add Image (Optional)</span>
            <input
              type="file"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <NewQuestion handleAddQuestion={handleAddQuestion} />
          <div className="comprehensionElement__questions">
            {questions.map((item, idx) => (
              <Question data={item} questionNo={idx + 1} key={idx} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ComprehensionElement;
