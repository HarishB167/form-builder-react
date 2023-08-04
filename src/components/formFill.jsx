import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getForm } from "../services/formBuilderService";
import ClozeFillElement from "./fillElements/clozeFillElement";
import CategorizeFillElement from "./fillElements/categorizeFillElement";
import ComprehensionFillElement from "./fillElements/comprehensionFillElement";
import { saveForm } from "../services/formFillService";
import "./formFill.css";

const FormFill = () => {
  const [formData, setFormData] = useState({});
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [answerData, setAnswerData] = useState({});
  const [isSumbitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    const retrieveData = async () => {
      setIsDataLoading(true);
      const data = await getForm(params.id);
      setIsDataLoading(false);
      setFormData(data);
      setAnswerData({
        formId: data._id,
        data: data.data.map((item) => ({})),
      });
    };
    retrieveData();
  }, []);

  const handleAnswerDataChange = (index, data) => {
    const ans = { ...answerData };
    ans.data[index] = data;
    setAnswerData({ ...ans });
    console.log("ans :>> ", ans);
  };

  const handleSubmit = async () => {
    try {
      await saveForm(answerData);
      setIsSubmitted(true);
    } catch (e) {
      alert("Unknown error occured");
    }
  };

  useEffect(() => {
    if (isSumbitted) {
      const timer = setTimeout(() => {
        navigate("/formResponses");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isSumbitted]);

  if (isSumbitted)
    return (
      <div className="formFill__submitted">
        <div className="formFill__submittedHeading">Form submitted</div>
        <div className="formFill__submittedContent">
          Thanks for submitting form.
        </div>
      </div>
    );

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
            handleAnswerDataChange={(data) => handleAnswerDataChange(idx, data)}
            answerData={answerData.data[idx]}
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
            handleAnswerDataChange={(data) => handleAnswerDataChange(idx, data)}
            answerData={answerData.data[idx]}
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
            handleAnswerDataChange={(data) => handleAnswerDataChange(idx, data)}
            answerData={answerData.data[idx]}
          />
        </div>
      );
  };

  return (
    <div className="formFill">
      <div className="formFill__heading">
        <div className="formFill__title">Form Filling</div>
        <button className="formFill__submitForm" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <div className="formFill__name">{formData.name}</div>
      {formData.data &&
        formData.data.map((item, idx) => renderQuestion(item, idx))}
    </div>
  );
};

export default FormFill;
