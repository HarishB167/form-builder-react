import { useState } from "react";
import ElementContainer from "./common/elementContainer";
import ImagePicker from "./common/imagePicker";
import Button from "./common/button";
import ActionButton from "./common/actionButton";
import DraggableList from "../../utils/draggableList";
import "./categorizeElement.css";

const CategorizeElement = () => {
  const [image, setImage] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true);
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

  const handleItemChange = (e) => {
    const dataIdValue = e.target.getAttribute("data-id");
    const its = [...items];
    its[parseInt(dataIdValue)].name = e.target.value;
    setItems([...its]);
  };

  const handleItemCategoryChange = (idx, e) => {
    const newItems = [...items];
    newItems[idx].category = e.target.value;
    setItems([...newItems]);
  };

  const getCategories = () => {
    return categories.filter((item) => item.length > 0);
  };

  const handleOnCategoryDragEnd = (result) => {
    if (!result.destination) return;

    const items = [...categories];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCategories(items);
  };

  const handleOnItemDragEnd = (result) => {
    if (!result.destination) return;

    const iList = [...items];
    const [reorderedItem] = iList.splice(result.source.index, 1);
    iList.splice(result.destination.index, 0, reorderedItem);
    setItems(iList);
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
        <div
          className={
            isCollapsed ? "elementHidden" : "categorizeElement__description"
          }
        >
          <input
            name="description"
            type="text"
            placeholder="Description Text"
            onChange={handleDescriptionChange}
            value={description}
          />
        </div>
        <div
          className={isCollapsed ? "elementHidden" : "categorizeElement__image"}
        >
          <ImagePicker
            label="Media: "
            image={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        {!isCollapsed && (
          <>
            <span className="categorizeElement_subHeading">
              Categories <Button label="+" onClick={handleCategoryAdd} />
            </span>
            <DraggableList
              className="categorizeElement__categories"
              itemClassName="categorizeElement__category"
              droppableId="categories"
              items={categories}
              handleOnDragEnd={handleOnCategoryDragEnd}
              renderListItemChild={(item, index) => (
                <>
                  <input
                    data-id={index}
                    value={item}
                    onChange={handleChangeCategory}
                    type="text"
                    placeholder={`Category ${index + 1}`}
                  />
                  <ActionButton
                    onClick={() => handleCategoryDelete(index)}
                    label="x"
                  />
                </>
              )}
            />
            <span className="categorizeElement_subHeading">
              Items <Button onClick={handleItemAdd} label="+" />
            </span>
            <DraggableList
              className="categorizeElement__items"
              itemClassName="categorizeElement__item"
              droppableId="items"
              items={items}
              handleOnDragEnd={handleOnItemDragEnd}
              renderListItemChild={(item, index) => (
                <>
                  <input
                    data-id={index}
                    type="text"
                    value={items[index].name}
                    onChange={handleItemChange}
                    placeholder={`Item ${index + 1}`}
                  />
                  <ActionButton
                    onClick={() => handleItemDelete(index)}
                    label="x"
                  />
                  <select
                    className="categorizeElement__select"
                    value={item.category}
                    onChange={(e) => handleItemCategoryChange(index, e)}
                  >
                    <option>Choose Category</option>
                    {getCategories().map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </>
              )}
            />
          </>
        )}
      </div>
    </ElementContainer>
  );
};

export default CategorizeElement;
