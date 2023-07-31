import { useEffect, useState } from "react";
import NewQuestion from "./comprehensionQuestions/newQuestion";
import Question from "./comprehensionQuestions/question";
import ElementContainer from "./common/elementContainer";
import Button from "./common/button";
import ImagePicker from "./common/imagePicker";
import "./comprehensionElement.css";

const ComprehensionElement = ({ handleQuestionDataChange }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    handleQuestionDataChange({
      questionType: "comprehension",
      image: image,
      text,
      questions,
    });
  }, [image, text, questions]);

  const handleAddQuestion = (question) => {
    setQuestions([...questions, question]);
  };

  return (
    <ElementContainer>
      <div className="comprehensionElement">
        <div className="comprehensionElement__headingLine">
          <div className="comprehensionElement__heading">Comprehension</div>
          <Button
            onClick={() => setIsCollapsed(!isCollapsed)}
            label={isCollapsed ? "+" : "-"}
          />
        </div>

        <div className={isCollapsed ? "elementHidden" : "elementContent"}>
          <div className="comprehensionElement__topLine">
            <span>Question</span>
            <span>Comprehension</span>
            <span>Points</span>
          </div>
          <div className="comprehensionElement__text">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>

          <div className="comprehensionElement__image">
            <ImagePicker
              label="Media: "
              image={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <NewQuestion handleAddQuestion={handleAddQuestion} />
          <div className="comprehensionElement__questions">
            {questions.map((item, idx) => (
              <Question data={item} questionNo={idx + 1} key={idx} />
            ))}
          </div>
        </div>
      </div>
    </ElementContainer>
  );
};

export default ComprehensionElement;
