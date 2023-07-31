import React, { useState, cloneElement } from "react";
import CategorizeElement from "./elements/categorizeElement";
import ClozeElement from "./elements/clozeElement";
import Button from "./elements/common/button";
import ComprehensionElement from "./elements/comprehensionElement";
import "./formBuilder.css";

const FormBuilder = () => {
  const [questions, setQuestions] = useState([]);
  const [questionData, setQuestionData] = useState([]);
  const elementTypes = {
    categorize: <CategorizeElement />,
    cloze: <ClozeElement />,
    comprehension: <ComprehensionElement />,
  };

  const handleQuestionDataChange = (id, data) => {
    const dt = [...questionData];
    dt[id] = data;
    setQuestionData(dt);
  };

  const handleRemoveItem = (itemId) => {
    setQuestions((prevQuestions) => {
      const q = [...prevQuestions];
      const idx = q.findIndex((item) => item.id === itemId);
      q.splice(idx, 1);
      return q;
    });
  };

  const handleRemoveItemNew = (index) => {
    setQuestionData((prevQuestions) => {
      const q = [...prevQuestions];
      const idx = q.findIndex((item) => item.id === index);
      q.splice(idx, 1);
      return q;
    });
  };

  const addQuestion = (questionItem) => {
    const id = new Date().getTime();
    const elem = (
      <div className="formBuilder__quesRow">
        {cloneElement(questionItem, {
          id,
          handleQuestionDataChange: (data) => console.log("dfdfdf"),
        })}
        <button
          className="formBuilder__btnRemove"
          onClick={() => handleRemoveItem(id)}
        >
          x
        </button>
      </div>
    );
    setQuestions([...questions, { element: elem, id }]);
    // setQuestionData({...questionData, { id, data: [] }});
  };

  const addQuestion2 = (type) => {
    setQuestionData([...questionData, { questionType: type }]);
  };

  const handleAddCategorizingQuestion = () => {
    console.log("Adding categorizing question");
    // addQuestion(<CategorizeElement />);
    addQuestion2("categorize");
  };

  const handleAddClozeQuestion = () => {
    console.log("Adding cloze question");
    // addQuestion(<ClozeElement />);
    addQuestion2("cloze");
  };

  const handleAddComprehensionQuestion = () => {
    console.log("Adding comprehension question");
    // addQuestion(<ComprehensionElement />);
    addQuestion2("comprehension");
  };

  const RenderQuestionElement = ({ index }) => {
    const item = questionData[index];
    console.log("questionData :>> ", questionData);
    if (!item) return <>s</>;
    console.log("item['questionType'] :>> ", item["questionType"]);
    const Component = elementTypes[item["questionType"]];
    console.log("Component :>> ", Component);
    if (!Component) return <>d</>;
    return <>{cloneElement(Component, { handleQuestionDataChange })}</>;
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
                  onClick={() => handleRemoveItemNew(idx)}
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
