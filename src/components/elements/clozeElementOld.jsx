import { useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./clozeElement.css";

const ClozeElement = () => {
  const [inputValue, setInputValue] = useState("");
  const [selections, setSelections] = useState([]);
  const inputRef = useRef(null);

  const handleInputChange = () => {
    const value = inputRef.current.innerText;
    setInputValue(value);
  };

  const handleUnderline = () => {
    const value = inputRef.current.innerText;
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const commonAncestor = range.commonAncestorContainer;

      if (inputRef.current.contains(commonAncestor)) {
        const val = value.slice(range.startOffset, range.endOffset);
        console.log("val :>> ", val);
        setSelections([...selections, [range.startOffset, range.endOffset]]);
      }
    }

    // const input = inputRef.current;
    // const val = input.value;
    // const selectionStart = input.selectionStart;
    // const selectionEnd = input.selectionEnd;
    // console.log("Underlining : ", val);
    // console.log("selectionStart :>> ", selectionStart);
    // console.log("selectionEnd :>> ", selectionEnd);

    // const val2 = inputValue.slice(selectionStart, selectionEnd);
    // console.log("val2 :>> ", val2);
    // handleUnderlineButtonClick();
  };

  const handleUnderlineButtonClick = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");
      span.style.textDecoration = "underline";
      range.surroundContents(span);
      handleInputChange();
    }
  };

  return (
    <Container className="clozeElement">
      <Row>
        <Col className="clozeElement__inputLines">
          <span>Preview</span>
          <input type="text" />
          <div>
            <span>Sentence</span>
            <Button size="sm" variant="primary" onClick={handleUnderline}>
              Underline
            </Button>
          </div>
          <div
            ref={inputRef}
            contentEditable
            className="custom-input"
            onInput={handleInputChange}
            value
          ></div>
        </Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default ClozeElement;
