import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import CategorizeElement from "./elements/categorizeElement";
import ClozeElement from "./elements/clozeElement";
import ComprehensionElement from "./elements/comprehensionElement";

const FormBuilder = () => {
  const [questions, setQuestions] = useState([]);

  const handleAddCategorizingQuestion = () => {
    console.log("Adding categorizing question");
    setQuestions([...questions, <CategorizeElement key={questions.length} />]);
  };

  const handleAddClozeQuestion = () => {
    console.log("Adding cloze question");
    setQuestions([...questions, <ClozeElement key={questions.length} />]);
  };

  const handleAddComprehensionQuestion = () => {
    console.log("Adding comprehension question");
    setQuestions([
      ...questions,
      <ComprehensionElement key={questions.length} />,
    ]);
  };

  return (
    <Container fluid>
      <Row>
        <Col style={{ background: "red" }}>Form builder</Col>
      </Row>
      <Row>
        <Col xs={2}>
          <Stack gap={3}>
            <Button variant="success" onClick={handleAddCategorizingQuestion}>
              Add categorizing question
            </Button>
            <Button variant="success" onClick={handleAddClozeQuestion}>
              Add cloze question
            </Button>
            <Button variant="success" onClick={handleAddComprehensionQuestion}>
              Add comprehension question
            </Button>
          </Stack>
        </Col>
        <Col>
          <div>Displaying items</div>
          <div>{questions}</div>
        </Col>
        <Col xs={2}>Right side view</Col>
      </Row>
    </Container>
  );
};

export default FormBuilder;
