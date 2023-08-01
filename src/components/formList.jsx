import { useEffect } from "react";
import { useState } from "react";
import { getForm, getForms } from "../services/fakeFormBuilderService";
import "./formList.css";

const FormList = () => {
  const [formsList, setFormsList] = useState([]);

  useEffect(() => {
    const retrieveFormList = async () => {
      const f = await getForms();
      setFormsList(f);
    };
    retrieveFormList();
  }, []);
  return (
    <div className="formList">
      {formsList.map((item, idx) => (
        <div className="formList__item" key={idx}>
          <span className="formList__itemTitle">{item.name}</span>
          <button className="formList__btn formList__btnOpen">Open</button>
          <button className="formList__btn formList__btnEdit">Edit</button>
        </div>
      ))}
    </div>
  );
};

export default FormList;
