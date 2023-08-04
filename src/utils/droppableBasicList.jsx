import { Draggable } from "react-beautiful-dnd";
import StrictModeDroppable from "./strictModeDroppable";

const DroppableBasicList = ({
  className,
  itemClassName,
  droppableId,
  items,
  renderListItemChild,
  direction = "vertical",
  renderClone = null,
}) => {
  const getDraggableStyle = (style, snapshot) => {
    if (snapshot.isDragging) {
      return {
        ...style,
        position: "static",
        marginBottom: `-${style.height}px`,
        marginLeft: `${style.width}px`,
        top: "0",
        left: `0`,
      };
    }
    return style;
  };

  return (
    <StrictModeDroppable
      droppableId={droppableId}
      direction={direction}
      renderClone={renderClone}
    >
      {(provided) => (
        <div
          className={className}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {items.map((item, index) => (
            <Draggable
              key={index}
              draggableId={String(index) + droppableId + "item"}
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
                  {renderListItemChild(item, index)}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </StrictModeDroppable>
  );
};

export default DroppableBasicList;
