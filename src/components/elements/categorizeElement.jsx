import { useState } from "react";
import ElementContainer from "./common/elementContainer";
import ImagePicker from "./common/imagePicker";
import Button from "./common/button";
import ActionButton from "./common/actionButton";
import "./categorizeElement.css";

const CategorizeElement = () => {
  const [image, setImage] = useState("");
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
    <ElementContainer>
      <div className="categorizeElement">
        <div className="categorizeElement__headingLine">
          <div className="categorizeElement__heading">Categorize</div>
          <Button
            onClick={() => setIsCollapsed(!isCollapsed)}
            label={isCollapsed ? "+" : "-"}
          />
        </div>

        {!isCollapsed && (
          <>
            <div className="categorizeElement__description">
              <input
                name="description"
                type="text"
                placeholder="Description Text"
                onChange={handleDescriptionChange}
                value={description}
              />
            </div>
            <div className="categorizeElement__image">
              <ImagePicker
                label="Media: "
                image={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div
              className="categorizeElement__categories"
              style={{ display: "flex", flexDirection: "column" }}
              xs={4}
            >
              <span className="categorizeElement_subHeading">
                Categories <Button label="+" onClick={handleCategoryAdd} />
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
                  <ActionButton
                    onClick={() => handleCategoryDelete(idx)}
                    label="x"
                  />
                </div>
              ))}
            </div>
            <div className="categorizeElement__items">
              <span className="categorizeElement_subHeading">
                Items <Button onClick={handleItemAdd} label="+" />
              </span>
              {items.map((item, idx) => (
                <div className="categorizeElement__item" key={idx}>
                  <input
                    data-id={idx}
                    type="text"
                    placeholder={`Item ${idx + 1}`}
                  />
                  <ActionButton
                    onClick={() => handleItemDelete(idx)}
                    label="x"
                  />
                  <select
                    className="categorizeElement__select"
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
    </ElementContainer>
  );
};

export default CategorizeElement;
