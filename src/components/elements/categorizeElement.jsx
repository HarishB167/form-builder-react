import { useEffect, useState } from "react";
import ElementContainer from "./common/elementContainer";
import ImagePicker from "./common/imagePicker";
import Button from "./common/button";
import ActionButton from "./common/actionButton";
import DraggableList from "../../utils/draggableList";
import "./categorizeElement.css";

const CategorizeElement = ({ data, handleQuestionDataChange }) => {
  const isDataValid = () => {
    if (
      data.hasOwnProperty("questionType") &&
      data.hasOwnProperty("image") &&
      data.hasOwnProperty("imageData") &&
      data.hasOwnProperty("description") &&
      data.hasOwnProperty("categories") &&
      data.hasOwnProperty("items")
    )
      return true;
    return false;
  };

  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    handleQuestionDataChange({
      questionType: "categorize",
      image: "",
      imageData: "",
      description: "",
      categories: [],
      items: [],
    });
  }, []);

  const handleDescriptionChange = (e) => {
    handleQuestionDataChange({ ...data, description: e.target.value });
  };

  const handleImagePicked = (e) => {
    handleQuestionDataChange({ ...data, image: e.target.value });

    let imgData = "";
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);

      reader.addEventListener("load", () => {
        imgData = reader.result;
        handleQuestionDataChange({
          ...data,
          image: e.target.value,
          imageData: imgData,
        });
      });
    }
  };

  const handleCategoryAdd = () => {
    handleQuestionDataChange({ ...data, categories: [...data.categories, ""] });
  };

  const handleCategoryDelete = (idx) => {
    const ctg = [...data.categories];
    ctg.splice(idx, 1);
    handleQuestionDataChange({ ...data, categories: [...ctg] });
  };

  const handleChangeCategory = (e) => {
    const dataIdValue = e.target.getAttribute("data-id");
    const ctg = data.categories;
    ctg[parseInt(dataIdValue)] = e.target.value;
    handleQuestionDataChange({ ...data, categories: [...ctg] });
  };

  const handleItemAdd = () => {
    const newItems = [...data.items, { name: "", category: "" }];
    handleQuestionDataChange({ ...data, items: newItems });
  };

  const handleItemDelete = (idx) => {
    const newItems = [...data.items];
    newItems.splice(idx, 1);
    handleQuestionDataChange({ ...data, items: [...newItems] });
  };

  const handleItemChange = (e) => {
    const dataIdValue = e.target.getAttribute("data-id");
    const its = [...data.items];
    its[parseInt(dataIdValue)].name = e.target.value;
    handleQuestionDataChange({ ...data, items: [...its] });
  };

  const handleItemCategoryChange = (idx, e) => {
    const newItems = [...data.items];
    newItems[idx].category = e.target.value;
    handleQuestionDataChange({ ...data, items: [...newItems] });
  };

  const getCategories = () => {
    return data.categories.filter((item) => item.length > 0);
  };

  const handleOnCategoryDragEnd = (result) => {
    if (!result.destination) return;

    const items = [...data.categories];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    handleQuestionDataChange({ ...data, categories: items });
  };

  const handleOnItemDragEnd = (result) => {
    if (!result.destination) return;

    const iList = [...data.items];
    const [reorderedItem] = iList.splice(result.source.index, 1);
    iList.splice(result.destination.index, 0, reorderedItem);
    handleQuestionDataChange({ ...data, items: iList });
  };

  if (!isDataValid()) {
    return null;
  }

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

        <div className={isCollapsed ? "elementHidden" : "elementContent"}>
          <div className="categorizeElement__description">
            <input
              name="description"
              type="text"
              placeholder="Description Text"
              onChange={handleDescriptionChange}
              value={data.description}
            />
          </div>
          <div className="categorizeElement__image">
            <ImagePicker
              label="Media: "
              image={data.image}
              onChange={handleImagePicked}
            />
          </div>
          <span className="categorizeElement_subHeading">
            Categories <Button label="+" onClick={handleCategoryAdd} />
          </span>
          <DraggableList
            className="categorizeElement__categories"
            itemClassName="categorizeElement__category"
            droppableId="categories"
            items={data.categories}
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
            items={data.items}
            handleOnDragEnd={handleOnItemDragEnd}
            renderListItemChild={(item, index) => (
              <>
                <input
                  data-id={index}
                  type="text"
                  value={data.items[index].name}
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
        </div>
      </div>
    </ElementContainer>
  );
};

export default CategorizeElement;
