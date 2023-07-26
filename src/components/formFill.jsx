import React, { useState } from "react";
import axios from "axios";

const FormFill = ({ formElements }) => {
  const [formResponses, setFormResponses] = useState({});

  const handleChange = (event, elementId) => {
    const { value, checked, type } = event.target;
    setFormResponses((prevResponses) => ({
      ...prevResponses,
      [elementId]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    // Save the form responses to the backend using axios or any other method
    axios
      .post("/api/saveFormResponses", { responses: formResponses })
      .then((response) => {
        // Handle successful response
      })
      .catch((error) => {
        // Handle error
      });
  };

  return (
    <div>
      {formElements.map((element) => (
        <div key={element.id}>
          {element.type === "text" && (
            <input
              type="text"
              placeholder={element.label}
              onChange={(e) => handleChange(e, element.id)}
            />
          )}
          {element.type === "textarea" && (
            <textarea
              placeholder={element.label}
              onChange={(e) => handleChange(e, element.id)}
            />
          )}
          {element.type === "checkbox" && (
            <div>
              <input
                type="checkbox"
                onChange={(e) => handleChange(e, element.id)}
              />
              <label>{element.label}</label>
            </div>
          )}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default FormFill;
