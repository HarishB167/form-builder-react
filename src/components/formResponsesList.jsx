import { useEffect, useState } from "react";
import { getForms } from "../services/formFillService";
import "./formList.css";

const FormResponsesList = () => {
  const [responsesList, setResponsesList] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);

  useEffect(() => {
    const retrieveFormList = async () => {
      setIsDataLoading(true);
      const f = await getForms();
      setIsDataLoading(false);
      console.log("f :>> ", f);
      setResponsesList(f);
    };
    retrieveFormList();
  }, []);

  const handleOpen = () => {
    alert("To be implemented");
  };

  return (
    <div className="formList">
      {isDataLoading && responsesList.length === 0 && (
        <span className="formList_loadingIcon">
          <i className="fa-solid fa-bars-staggered fa-flip"></i>
        </span>
      )}
      {responsesList.map((item, idx) => (
        <div className="formList__item" key={idx}>
          <span className="formList__itemTitle">{item.formName}</span>
          <button
            className="formList__btn formList__btnOpen"
            onClick={handleOpen}
          >
            Open
          </button>
        </div>
      ))}
    </div>
  );
};

export default FormResponsesList;
