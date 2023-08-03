import { useEffect } from "react";
import TextQuestion from "./comprehensionQuestions/textQuestion";
import MCQ from "./comprehensionQuestions/mcq";
import SCQ from "./comprehensionQuestions/scq";
import "./comprehensionFillElement.css";

const ComprehensionFillElement = ({
  questionNo,
  text,
  questions,
  handleAnswerDataChange,
  answerData,
}) => {
  const isDataValid = () => {
    if (
      answerData.hasOwnProperty("questionType") &&
      answerData.hasOwnProperty("answers")
    )
      return true;
    return false;
  };

  useEffect(() => {
    handleAnswerDataChange({
      questionType: "comprehension",
      answers: questions.map((item) => ({})),
    });
  }, [questions]);

  useEffect(() => {
    console.log("answerData :>> ", answerData);
  }, [answerData]);

  const handleTextQuesDataChange = (index, text) => {
    const ansData = { ...answerData };
    ansData.answers[index] = { type: "Text", text };
    handleAnswerDataChange(ansData);
  };

  const handleMCQDataChange = (index, selectedOptions) => {
    const ansData = { ...answerData };
    ansData.answers[index] = { type: "MCQ", selectedOptions };
    handleAnswerDataChange(ansData);
  };

  const handleSCQDataChange = (index, selectedOption) => {
    const ansData = { ...answerData };
    ansData.answers[index] = { type: "SCQ", selectedOption };
    handleAnswerDataChange(ansData);
  };

  if (!isDataValid()) {
    return null;
  }

  return (
    <div className="comprehensionFillElement">
      <div className="comprehensionFillElement__header">
        Question {questionNo}
      </div>
      <div className="comprehensionFillElement__text">{text}</div>
      {questions.map((qItem, idx) => {
        if (qItem.type === "MCQ" && qItem.correctOptions.length === 1)
          return (
            <SCQ
              questionNo={questionNo}
              question={qItem}
              qNo={idx + 1}
              key={idx}
              selectedOption={
                answerData.answers[idx]
                  ? answerData.answers[idx].selectedOption
                  : null
              }
              handleAnswerChange={(selectedOption) =>
                handleSCQDataChange(idx, selectedOption)
              }
            />
          );
        else if (qItem.type === "MCQ" && qItem.correctOptions.length > 1)
          return (
            <MCQ
              questionNo={questionNo}
              question={qItem}
              qNo={idx + 1}
              key={idx}
              selectedOptions={
                answerData.answers[idx]
                  ? answerData.answers[idx].selectedOptions
                  : null
              }
              handleAnswerChange={(selectedOptions) =>
                handleMCQDataChange(idx, selectedOptions)
              }
            />
          );
        else if (qItem.type === "Text")
          return (
            <TextQuestion
              questionNo={questionNo}
              question={qItem}
              qNo={idx + 1}
              key={idx}
              text={answerData.answers[idx] ? answerData.answers[idx].text : ""}
              handleAnswerChange={(text) => handleTextQuesDataChange(idx, text)}
            />
          );
        else {
          return <div>Unknown question type : {qItem.type}</div>;
        }
      })}
    </div>
  );
};

export default ComprehensionFillElement;
