import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getForms } from "../services/formBuilderService";
import "./formList.css";

const FormList = () => {
  const [formsList, setFormsList] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const retrieveFormList = async () => {
      setIsDataLoading(true);
      const f = await getForms();
      setIsDataLoading(false);
      console.log("f :>> ", f);
      setFormsList(f);
    };
    retrieveFormList();
  }, []);

  const handleCreateForm = () => {
    navigate("/builder");
  };

  const handleOpen = (id) => {
    console.log("id :>> ", id);
    navigate(`/formFill/${id}`);
  };

  const handleEdit = () => {
    alert("To be implemented");
  };

  return (
    <div className="formList">
      <button className="formList__createForm" onClick={handleCreateForm}>
        Create Form
      </button>
      {isDataLoading && formsList.length === 0 && (
        <span className="formList_loadingIcon">
          <i className="fa-solid fa-bars-staggered fa-flip"></i>
        </span>
      )}
      {formsList.map((item, idx) => (
        <div className="formList__item" key={idx}>
          <span className="formList__itemTitle">{item.name}</span>
          <button
            className="formList__btn formList__btnOpen"
            onClick={() => handleOpen(item._id)}
          >
            Open
          </button>
          <button
            className="formList__btn formList__btnEdit"
            onClick={handleEdit}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default FormList;
