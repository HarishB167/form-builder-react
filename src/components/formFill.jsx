import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getForm } from "../services/formBuilderService";
import "./formFill.css";
import ClozeFillElement from "./fillElements/clozeFillElement";
import CategorizeFillElement from "./fillElements/categorizeFillElement";
import ComprehensionFillElement from "./fillElements/comprehensionFillElement";

const FormFill = () => {
  const [formData, setFormData] = useState({});
  const [isDataLoading, setIsDataLoading] = useState(false);

  const params = useParams();

  useEffect(() => {
    const retrieveData = async () => {
      setIsDataLoading(true);
      const data = await getForm(params.id);
      setIsDataLoading(false);
      console.log("data :>> ", data);
      setFormData(data);
    };
    retrieveData();
  }, []);

  if (!formData._id && isDataLoading)
    return (
      <div className="formFill formFill_loading">
        <span className="formFill_loadingIcon">
          <i className="fa-solid fa-circle-notch fa-spin"></i>
        </span>
        <div className="formFill_loading_label">Loading</div>
      </div>
    );

  const renderQuestion = (questionItem, idx) => {
    if (questionItem.questionType === "cloze")
      return (
        <div key={idx}>
          <ClozeFillElement
            questionNo={idx + 1}
            text={questionItem.text}
            maskingRanges={questionItem.maskingRanges}
            options={questionItem.options}
          />
        </div>
      );
    else if (questionItem.questionType === "categorize")
      return (
        <div key={idx}>
          <CategorizeFillElement
            questionNo={idx + 1}
            description={questionItem.description}
            categories={questionItem.categories}
            items={questionItem.items}
          />
        </div>
      );
    else if (questionItem.questionType === "comprehension")
      return (
        <div key={idx}>
          <ComprehensionFillElement
            questionNo={idx + 1}
            text={questionItem.text}
            questions={questionItem.questions}
          />
        </div>
      );
  };

  return (
    <div className="formFill">
      <div className="formFill__title">Form Filling</div>
      <div className="formFill__name">{formData.name}</div>
      {formData.data &&
        formData.data.map((item, idx) => renderQuestion(item, idx))}
    </div>
  );
};

export default FormFill;
