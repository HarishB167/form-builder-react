import { useState } from "react";
import ActionButton from "../common/actionButton";
import Button from "../common/button";
import "./newQuestion.css";

const Option = ({
  index,
  data,
  handleTextChange,
  handleRemoveOption,
  handleCorrectOptionChange,
}) => {
  return (
    <div className="newQuestion__option">
      <input
        type="checkbox"
        data-index={index}
        onChange={handleCorrectOptionChange}
        checked={data.isCorrect}
      />
      <input
        type="text"
        value={data.text}
        onChange={(e) => handleTextChange(index, e)}
      />
      <ActionButton onClick={() => handleRemoveOption(index)} label="x" />
    </div>
  );
};

const NewQuestion = ({ handleAddQuestion }) => {
  const [text, setText] = useState("");
  const [questionType, setQuestionType] = useState("MCQ");
  const [options, setOptions] = useState([{ text: "", isCorrect: false }]);
  const [textConstraints, setTextConstraints] = useState({
    minChars: 0,
    maxChars: 100,
  });

  const handleQuestionTypeChange = (e) => {
    setQuestionType(e.target.value);
  };

  const handleAddOption = () => {
    setOptions([...options, { text: "", isCorrect: false }]);
  };

  const handleOptionTextChange = (idx, e) => {
    const newOptions = [...options];
    newOptions[idx].text = e.target.value;
    setOptions(newOptions);
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };

  const handleCorrectOptionChange = (e) => {
    const idx = parseInt(e.target.getAttribute("data-index"));
    const opts = [...options];
    opts[idx].isCorrect = e.target.checked;
    setOptions([...opts]);
  };

  const handleSaveQuestion = () => {
    const question = {
      type: questionType,
      text: text,
    };

    if (text.length === 0) {
      alert("Please fill question before saving");
      return;
    }

    if (questionType === "MCQ") {
      question.options = options.map((item) => item.text);
      question.correctOptions = options.reduce((pV, cV, idx) => {
        if (cV.isCorrect) pV.push(idx);
        return pV;
      }, []);

      if (question.options.length < 2) alert("Use more than 1 options");
      else if (question.correctOptions.length === 0)
        alert("Make atleast on correct option.");
      else if (question.options.some((item) => item.length === 0))
        alert("One or more options' is/are empty.");
      else handleAddQuestion(question);
    } else if (questionType === "Text") {
      question.textConstraints = textConstraints;
      handleAddQuestion(question);
    }

    console.log("question :>> ", question);
  };

  return (
    <div className="newQuestion">
      <div className="newQuestion__topLine">
        <span>Question</span>
        <select
          className="newQuestion__select"
          onChange={handleQuestionTypeChange}
          value={questionType}
        >
          <option>MCQ</option>
          <option>Text</option>
        </select>
        <span>Points</span>
      </div>
      <div className="newQuestion__text">
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
      </div>
      {questionType === "MCQ" && (
        <div className="newQuestion__options">
          <Button onClick={handleAddOption} label="Add Option" />
          {options.map((option, index) => (
            <Option
              key={index}
              index={index}
              data={option}
              handleTextChange={handleOptionTextChange}
              handleRemoveOption={handleRemoveOption}
              handleCorrectOptionChange={handleCorrectOptionChange}
            />
          ))}
        </div>
      )}
      {questionType === "Text" && (
        <div className="newQuestion__typeText">
          <label htmlFor="minChars">Min Chars: </label>
          <input
            type="number"
            id="minChars"
            value={textConstraints.minChars}
            onChange={(e) =>
              setTextConstraints({
                ...textConstraints,
                minChars: e.target.value,
              })
            }
          />
          <label htmlFor="minChars">Max Chars: </label>
          <input
            type="number"
            id="maxChars"
            value={textConstraints.maxChars}
            onChange={(e) =>
              setTextConstraints({
                ...textConstraints,
                maxChars: e.target.value,
              })
            }
          />
        </div>
      )}

      <Button label="Save" onClick={handleSaveQuestion} />
    </div>
  );
};

export default NewQuestion;
