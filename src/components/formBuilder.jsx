import { useState } from "react";
import CategorizeElement from "./elements/categorizeElement";
import ClozeElement from "./elements/clozeElement";
import Button from "./elements/common/button";
import ComprehensionElement from "./elements/comprehensionElement";
import "./formBuilder.css";

const FormBuilder = () => {
  const [questionData, setQuestionData] = useState([]);

  const handleQuestionDataChange = (id, data) => {
    const dt = [...questionData];
    dt[id] = data;
    setQuestionData(dt);
  };

  const handleRemoveItem = (index) => {
    setQuestionData((prevQuestions) => {
      const q = [...prevQuestions];
      const idx = q.findIndex((item) => item.id === index);
      q.splice(idx, 1);
      return q;
    });
  };

  const addQuestion = (type) => {
    setQuestionData([...questionData, { questionType: type }]);
  };

  const handleAddCategorizingQuestion = () => {
    console.log("Adding categorizing question");
    addQuestion("categorize");
  };

  const handleAddClozeQuestion = () => {
    console.log("Adding cloze question");
    addQuestion("cloze");
  };

  const handleAddComprehensionQuestion = () => {
    console.log("Adding comprehension question");
    addQuestion("comprehension");
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
            {questionData.map((item, idx) => (
              <div className="formBuilder__quesRow" key={idx}>
                {item.questionType === "categorize" && (
                  <CategorizeElement
                    data={item}
                    handleQuestionDataChange={(data) =>
                      handleQuestionDataChange(idx, data)
                    }
                  />
                )}
                {item.questionType === "cloze" && (
                  <ClozeElement
                    data={item}
                    handleQuestionDataChange={(data) =>
                      handleQuestionDataChange(idx, data)
                    }
                  />
                )}
                {item.questionType === "comprehension" && (
                  <ComprehensionElement
                    data={item}
                    handleQuestionDataChange={(data) =>
                      handleQuestionDataChange(idx, data)
                    }
                  />
                )}
                <button
                  className="formBuilder__btnRemove"
                  onClick={() => handleRemoveItem(idx)}
                >
                  x
                </button>
              </div>
            ))}
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
