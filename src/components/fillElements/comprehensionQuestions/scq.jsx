import QuestionContainer from "./questionContainer";
import "./scq.css";

const SCQ = ({
  questionNo,
  question,
  qNo,
  selectedOption,
  handleAnswerChange,
}) => {
  const handleRadioChange = (optionNo) => {
    handleAnswerChange(optionNo);
  };

  return (
    <QuestionContainer questionNo={questionNo} qNo={qNo}>
      <div className="scq">
        <div className="scq__qText">{question.text}</div>
        <div className="scq__qOptions">
          {question.options.map((item, idx) => (
            <div key={idx}>
              <input
                type="radio"
                id={`${questionNo}.${qNo}.${idx}`}
                name={`${questionNo}.${qNo}`}
                checked={idx + 1 === selectedOption}
                onChange={() => handleRadioChange(idx + 1)}
              />
              <label htmlFor={`${questionNo}.${qNo}.${idx}`}>{item}</label>
            </div>
          ))}
        </div>
      </div>
    </QuestionContainer>
  );
};

export default SCQ;
