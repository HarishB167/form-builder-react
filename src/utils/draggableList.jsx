import { DragDropContext, Draggable } from "react-beautiful-dnd";
import StrictModeDroppable from "./strictModeDroppable";

const DraggableList = ({
  className,
  itemClassName,
  droppableId,
  items,
  handleOnDragEnd,
  renderListItemChild,
}) => {
  const getDraggableStyle = (style, snapshot) => {
    if (snapshot.isDragging) {
      return {
        ...style,
        position: "relative",
        marginBottom: `-${style.height}px`,
        top: "0",
        left: "0",
      };
    }
    return style;
  };

  console.log("items :>> ", items);

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <StrictModeDroppable droppableId={droppableId}>
        {(provided) => (
          <div
            className={className}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {items.map((item, index) => (
              <Draggable
                key={index}
                draggableId={String(index) + "item"}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getDraggableStyle(
                      provided.draggableProps.style,
                      snapshot
                    )}
                    className={itemClassName}
                    key={index}
                  >
                    <span className="categorizeElement__grip">
                      <i className="fa-solid fa-grip fa-rotate-90"></i>
                    </span>

                    {renderListItemChild(item, index)}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    </DragDropContext>
  );
};

export default DraggableList;
