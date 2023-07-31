import React, { useState, cloneElement } from "react";
import CategorizeElement from "./elements/categorizeElement";
import ClozeElement from "./elements/clozeElement";
import Button from "./elements/common/button";
import ComprehensionElement from "./elements/comprehensionElement";
import "./formBuilder.css";

const FormBuilder = () => {
  const [questions, setQuestions] = useState([]);
  const [questionData, setQuestionData] = useState([]);

  const handleQuestionDataChange = (id, data) => {
    console.log("In handleQuestionDataChange");
    console.log("data :>> ", data);
    setQuestionData((prevData) => {
      const dt = [...questionData];
      const item = dt.find((item) => item.id === id);
      if (item) item.data = data;
      return dt;
    });
  };

  const handleRemoveItem = (itemId) => {
    setQuestions((prevQuestions) => {
      const q = [...prevQuestions];
      const idx = q.findIndex((item) => item.id === itemId);
      q.splice(idx, 1);
      return q;
    });
  };

  const addQuestion = (questionItem) => {
    const id = new Date().getTime();
    const elem = (
      <div className="formBuilder__quesRow">
        {cloneElement(questionItem, { id, handleQuestionDataChange })}
        <button
          className="formBuilder__btnRemove"
          onClick={() => handleRemoveItem(id)}
        >
          x
        </button>
      </div>
    );
    setQuestions([...questions, { element: elem, id }]);
    setQuestionData([...questionData, { id, data: [] }]);
  };

  const handleAddCategorizingQuestion = () => {
    console.log("Adding categorizing question");
    addQuestion(<CategorizeElement />);
  };

  const handleAddClozeQuestion = () => {
    console.log("Adding cloze question");
    addQuestion(<ClozeElement />);
  };

  const handleAddComprehensionQuestion = () => {
    console.log("Adding comprehension question");
    addQuestion(<ComprehensionElement />);
  };

  return (
    <div className="formBuilder">
      <div className="formBuilder__title">Form Builder</div>
      <div className="formBuilder__content">
        <div className="formBuilder__actions">
          <button onClick={handleAddCategorizingQuestion}>
            Add categorizing question
          </button>
          <button onClick={handleAddClozeQuestion}>Add cloze question</button>
          <button onClick={handleAddComprehensionQuestion}>
            Add comprehension question
          </button>
        </div>
        <div className="formBuilder__list">
          <div className="formBuilder__listTitle">Create Form</div>
          <div className="formBuilder__listItems">
            {questions.map((item, idx) =>
              cloneElement(item.element, { key: idx })
            )}
          </div>
        </div>
        <div className="formBuilder_sideBarRight">
          <Button label="Save" />
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
