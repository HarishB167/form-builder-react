import { useState } from "react";
import CategorizeElement from "./elements/categorizeElement";
import ClozeElement from "./elements/clozeElement";
import ComprehensionElement from "./elements/comprehensionElement";
import "./formBuilder.css";

const FormBuilder = () => {
  const [questions, setQuestions] = useState([]);

  const handleRemoveItem = (idx) => {
    console.log("idx :>> ", idx);
    const q = [...questions];
    console.log("q before :>> ", q);
    q.splice(idx, 1);
    console.log("q :>> ", q);
    setQuestions(q);
  };

  const addQuestion = (questionItem, idx) => {
    const elem = (
      <div className="formBuilder__quesRow">
        {questionItem}
        <button
          className="formBuilder__btnRemove"
          onClick={() => handleRemoveItem(idx)}
        >
          x
        </button>
      </div>
    );
    setQuestions([...questions, elem]);
  };

  const handleAddCategorizingQuestion = () => {
    console.log("Adding categorizing question");
    addQuestion(
      <CategorizeElement key={questions.length} />,
      questions.length - 1
    );
  };

  const handleAddClozeQuestion = () => {
    console.log("Adding cloze question");
    addQuestion(<ClozeElement key={questions.length} />, questions.length - 1);
  };

  const handleAddComprehensionQuestion = () => {
    console.log("Adding comprehension question");
    addQuestion(
      <ComprehensionElement key={questions.length} />,
      questions.length - 1
    );
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
          <div className="formBuilder__listTitle">Displaying Items</div>
          <div>{questions}</div>
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
