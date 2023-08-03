import { DragDropContext, Draggable } from "react-beautiful-dnd";
import StrictModeDroppable from "./strictModeDroppable";

const DraggableBasicList = ({
  className,
  itemClassName,
  droppableId,
  items,
  handleOnDragEnd,
  renderListItemChild,
  direction = "vertical",
  renderClone = null,
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

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
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

export default DraggableBasicList;
