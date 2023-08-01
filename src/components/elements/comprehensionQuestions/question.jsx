import "./question.css";

const Question = ({ data, questionNo }) => {
  return (
    <div className="comprehension__questionUnit">
      <div className="questionUnit__topLine">
        <span>Question {questionNo}</span>
        <span>{data.type}</span>
        <span></span>
      </div>
      <div className="questionUnit__question">
        <span>Question:</span>
        <span>{data.text}</span>
      </div>
      <div className="questionUnit__content">
        {data.type === "MCQ" && (
          <>
            {data.options.map((item, idx) => (
              <div className="questionUnit_option" key={idx}>
                <input
                  type="checkbox"
                  id={idx}
                  checked={data.correctOptions.some((item) => item === idx)}
                  readOnly
                />
                <label htmlFor={idx}>{item}</label>
              </div>
            ))}
          </>
        )}
        {data.type === "Text" && (
          <span>
            <strong>Min chars: </strong>
            {data.textConstraints.minChars} <strong>Max chars: </strong>{" "}
            {data.textConstraints.maxChars}
          </span>
        )}
      </div>
    </div>
  );
};

export default Question;
