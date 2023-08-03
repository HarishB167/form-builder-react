import QuestionContainer from "./questionContainer";
import "./textQuestion.css";

const TextQuestion = ({
  questionNo,
  question,
  qNo,
  handleAnswerChange,
  text,
}) => {
  return (
    <QuestionContainer questionNo={questionNo} qNo={qNo}>
      <div className="textQuestion__text">
        <div className="textQuestion__qText">{question.text}</div>
        <div className="textQuestion__answerInput">
          <textarea
            value={text ? text : ""}
            onChange={(e) => handleAnswerChange(e.target.value)}
          ></textarea>
        </div>
      </div>
    </QuestionContainer>
  );
};

export default TextQuestion;
