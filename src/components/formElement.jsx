import React from "react";

const FormElement = ({ element }) => {
  return (
    <div>
      {element.type === "text" && (
        <input type="text" placeholder={element.label} />
      )}
      {element.type === "textarea" && <textarea placeholder={element.label} />}
      {element.type === "checkbox" && (
        <div>
          <input type="checkbox" />
          <label>{element.label}</label>
        </div>
      )}
    </div>
  );
};

export default FormElement;
