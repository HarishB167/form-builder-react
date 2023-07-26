import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

const FormBuilder = () => {
  return (
    <Container fluid>
      <Row>
        <Col style={{ background: "red" }}>Form builder</Col>
      </Row>
      <Row>
        <Col xs={2}>
          <Stack gap={3}>
            <Button variant="success">Add categorizing question</Button>
            <Button variant="success">Add cloze question</Button>
            <Button variant="success">Add comprehension question</Button>
          </Stack>
        </Col>
        <Col>Displaying items</Col>
        <Col xs={2}>Right side view</Col>
      </Row>
    </Container>
  );
};

export default FormBuilder;
