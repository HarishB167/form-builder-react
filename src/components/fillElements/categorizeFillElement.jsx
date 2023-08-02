import "./categorizeFillElement.css";

const colors = ["#cdb4db", "#ffc8dd", "#ffafcc", "#bde0fe", "#a2d2ff"];

const CategorizeFillElement = ({
  description,
  categories,
  items,
  questionNo,
}) => {
  const getRandomColor = (number) => {
    const idx = number % colors.length;
    return colors[idx];
  };

  return (
    <div className="categorizeFillElement">
      <div className="categorizeFillElement__header">Question {questionNo}</div>
      <div className="categorizeFillElement__description">{description}</div>
      <div className="categorizeFillElement__optionContainer">
        {items.map((item, idx) => (
          <span className="categorizeFillElement__option" key={idx}>
            {item.name}
          </span>
        ))}
      </div>
      <div className="categorizeFillElement__categories">
        {categories.map((ctg, idx) => (
          <div key={idx} className="categorizeFillElement__ctg">
            <div
              className="categorizeFillElement__ctgName"
              style={{ backgroundColor: getRandomColor(idx) }}
            >
              {ctg}
            </div>
            <div
              className="categorizeFillElement__ctgItems"
              style={{ backgroundColor: getRandomColor(idx) }}
            ></div>
          </div>
        ))}
      </div>
      {/* <div className="clozeFillElment__answerArea">
        {maskingRanges.map((item, idx) => (
          <>
            <span className="categorizeFillElement__partText">
              {getSubstring(item, idx)}
            </span>
            <span className="categorizeFillElement__input" type="text" />
          </>
        ))}
      </div> */}
    </div>
  );
};

export default CategorizeFillElement;
