import { useState } from "react";
import "./categorizeElement.css";

const CategorizeElement = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCategoryAdd = () => {
    setCategories([...categories, ""]);
  };

  const handleCategoryDelete = (idx) => {
    const ctg = [...categories];
    ctg.splice(idx, 1);
    setCategories([...ctg]);
  };

  const handleChangeCategory = (e) => {
    const dataIdValue = e.target.getAttribute("data-id");
    const ctg = categories;
    categories[parseInt(dataIdValue)] = e.target.value;
    setCategories([...ctg]);
  };

  const handleItemAdd = () => {
    setItems([...items, { name: "", category: "" }]);
  };

  const handleItemDelete = (idx) => {
    const newItems = [...items];
    newItems.splice(idx, 1);
    setItems([...newItems]);
  };

  const handleItemCategoryChange = (idx, e) => {
    const newItems = [...items];
    newItems[idx].category = e.target.value;
    setItems([...newItems]);
  };
  const getCategories = () => {
    return categories.filter((item) => item.length > 0);
  };

  return (
    <div className="categorizeElement">
      <div className="categorizeElement__description">
        <input
          name="description"
          type="text"
          placeholder="Description Text"
          onChange={handleDescriptionChange}
          value={description}
        />
        <button
          className="categorizeElement__btnCollapse"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? "+" : "-"}
        </button>
      </div>
      {!isCollapsed && (
        <>
          <div
            className="categorizeElement__categories"
            style={{ display: "flex", flexDirection: "column" }}
            xs={4}
          >
            <span>
              Categories <button onClick={handleCategoryAdd}>+</button>
            </span>
            {categories.map((item, idx) => (
              <div className="categorizeElement__category" key={idx}>
                <input
                  data-id={idx}
                  value={item}
                  onChange={handleChangeCategory}
                  type="text"
                  placeholder={`Category ${idx + 1}`}
                />
                <button onClick={() => handleCategoryDelete(idx)}>x</button>
              </div>
            ))}
          </div>
          <div className="categorizeElement__items">
            <span>
              Items <button onClick={handleItemAdd}>+</button>
            </span>
            {items.map((item, idx) => (
              <div className="categorizeElement__item" key={idx}>
                <input
                  data-id={idx}
                  type="text"
                  placeholder={`Item ${idx + 1}`}
                />
                <button variant="danger" onClick={() => handleItemDelete(idx)}>
                  x
                </button>
                <select
                  value={item.category}
                  onChange={(e) => handleItemCategoryChange(idx, e)}
                >
                  <option>Choose Category</option>
                  {getCategories().map((item, idx) => (
                    <option key={idx} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CategorizeElement;
