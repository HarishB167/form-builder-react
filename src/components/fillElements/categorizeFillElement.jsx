import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DroppableBasicList from "../../utils/droppableBasicList";
import "./categorizeFillElement.css";

const colors = ["#cdb4db", "#ffc8dd", "#ffafcc", "#bde0fe", "#a2d2ff"];

const CategorizeFillElement = ({
  description,
  categories,
  items,
  questionNo,
  handleAnswerDataChange,
  answerData,
}) => {
  const setInitalStateCategories = () => {
    const data = {};
    categories.forEach((ctg) => {
      data[ctg] = [];
    });
    return data;
  };

  const setInitialStateOptions = () => {
    return items.map((i) => i.name);
  };

  const [categoriesAnswer, setCategoriesAnswer] = useState(
    setInitalStateCategories()
  );
  const [options, setOptions] = useState(setInitialStateOptions());

  const getRandomColor = (number) => {
    const idx = number % colors.length;
    return colors[idx];
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    if (result.destination.droppableId === result.source.droppableId) return;

    const answer = { ...categoriesAnswer };

    if (result.source.droppableId === "options") {
      const newOptions = [...options];
      const option = newOptions.splice(result.source.index, 1)[0];
      const category = result.destination.droppableId.replace("Category_", "");
      answer[category].push(option);
      console.log("answer :>> ", answer);
      setOptions(newOptions);
      setCategoriesAnswer(answer);
    } else if (result.destination.droppableId !== "options") {
      const source = result.source.droppableId.replace("Category_", "");
      const sourceIndex = result.source.index;
      const destination = result.destination.droppableId.replace(
        "Category_",
        ""
      );
      const option = answer[source].splice(sourceIndex, 1)[0];
      answer[destination].push(option);
      setCategoriesAnswer(answer);
    }
  };

  useEffect(() => {
    handleAnswerDataChange(categoriesAnswer);
  }, [categoriesAnswer]);

  return (
    <div className="categorizeFillElement">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="categorizeFillElement__header">
          Question {questionNo}
        </div>
        <div className="categorizeFillElement__description">{description}</div>
        <DroppableBasicList
          className="categorizeFillElement__optionContainer"
          direction="horizontal"
          itemClassName=""
          droppableId="options"
          items={options}
          renderListItemChild={(item, index) => (
            <span className="categorizeFillElement__option" key={index}>
              {item}
            </span>
          )}
        />
        <div className="categorizeFillElement__categories">
          {categories.map((ctg, idx) => (
            <div key={idx} className="categorizeFillElement__ctg">
              <div
                className="categorizeFillElement__ctgName"
                style={{ backgroundColor: getRandomColor(idx) }}
              >
                {ctg}
              </div>
              <div
                className="categorizeFillElement__ctgItems"
                style={{ backgroundColor: getRandomColor(idx) }}
              >
                <DroppableBasicList
                  className="categorizeFillElement__ctgItems"
                  itemClassName=""
                  droppableId={"Category_" + ctg}
                  items={categoriesAnswer[ctg]}
                  renderListItemChild={(item, index) => (
                    <span className="categorizeFillElement__option" key={index}>
                      {item}
                    </span>
                  )}
                />
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default CategorizeFillElement;
