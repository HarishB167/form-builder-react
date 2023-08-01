import { useEffect, useState } from "react";
import NewQuestion from "./comprehensionQuestions/newQuestion";
import Question from "./comprehensionQuestions/question";
import ElementContainer from "./common/elementContainer";
import Button from "./common/button";
import ImagePicker from "./common/imagePicker";
import "./comprehensionElement.css";

const ComprehensionElement = ({ data, handleQuestionDataChange }) => {
  const isDataValid = () => {
    if (
      data.hasOwnProperty("questionType") &&
      data.hasOwnProperty("image") &&
      data.hasOwnProperty("questions")
    )
      return true;
    return false;
  };

  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    handleQuestionDataChange({
      questionType: "comprehension",
      image: "",
      text: "",
      questions: [],
    });
  }, []);

  const handleTextChange = (e) => {
    handleQuestionDataChange({ ...data, text: e.target.value });
  };

  const handleImageChange = (e) => {
    handleQuestionDataChange({ ...data, image: e.target.value });
  };

  const handleAddQuestion = (question) => {
    handleQuestionDataChange({
      ...data,
      questions: [...data.questions, question],
    });
  };

  if (!isDataValid()) {
    return null;
  }

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
            <textarea value={data.text} onChange={handleTextChange}></textarea>
          </div>

          <div className="comprehensionElement__image">
            <ImagePicker
              label="Media: "
              image={data.image}
              onChange={handleImageChange}
            />
          </div>
          <NewQuestion handleAddQuestion={handleAddQuestion} />
          <div className="comprehensionElement__questions">
            {data.questions.map((item, idx) => (
              <Question data={item} questionNo={idx + 1} key={idx} />
            ))}
          </div>
        </div>
      </div>
    </ElementContainer>
  );
};

export default ComprehensionElement;
