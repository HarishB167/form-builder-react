import { useEffect } from "react";
import "./clozeFillElement.css";

const ClozeFillElement = ({ text, maskingRanges, options, questionNo }) => {
  console.log("options :>> ", options);

  const getCleanMaskingRanges = () => {
    const data = maskingRanges.sort((a, b) => {
      if (a[0] < b[0]) return -1;
      else if (a[0] > b[0]) return 1;
      else if (a[0] === b[0]) return 0;
    });
    return data;
  };

  const getSubstring = (item, idx) => {
    if (idx === 0) return text.substring(0, item[0]);
    else return text.substring(maskingRanges[idx - 1][1], item[0]);
  };

  useEffect(() => {
    const data = getCleanMaskingRanges();
    console.log("data :>> ", data);
  });

  return (
    <div className="clozeFillElement">
      <div className="clozeFillElement__header">Question {questionNo}</div>
      <div className="clozeFillElement__optionContainer">
        {options.map((item, idx) => (
          <span className="clozeFillElement__option" key={idx}>
            {item.text}
          </span>
        ))}
      </div>
      <div className="clozeFillElment__answerArea">
        {maskingRanges.map((item, idx) => (
          <>
            <span className="clozeFillElement__partText">
              {getSubstring(item, idx)}
            </span>
            <span className="clozeFillElement__input" type="text" />
          </>
        ))}
      </div>
    </div>
  );
};

export default ClozeFillElement;
