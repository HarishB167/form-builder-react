import { useState } from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import StrictModeDroppable from "../utils/strictModeDroppable";
import "./testDrag.css";

const finalSpaceCharacters = [
  {
    id: "gary",
    name: "Gary Goodspeed",
    thumb: "/images/gary.png",
  },
  {
    id: "cato",
    name: "Little Cato",
    thumb: "/images/cato.png",
  },
  {
    id: "kvn",
    name: "KVN",
    thumb: "/images/kvn.png",
  },
  {
    id: "mooncake",
    name: "Mooncake",
    thumb: "/images/mooncake.png",
  },
  {
    id: "quinn",
    name: "Quinn Ergon",
    thumb: "/images/quinn.png",
  },
];

const TestDrag = () => {
  const [characters, updateCharacters] = useState(finalSpaceCharacters);

  const baseUrl =
    "https://raw.githubusercontent.com/colbyfayock/my-final-space-characters/part-0-starting-point/public";

  const handleOnDragEnd = (result) => {
    console.log("result :>> ", result);

    if (!result.destination) return;

    const items = [...characters];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  };

  return (
    <div>
      <div className="App">
        <header className="App-header">
          <h1>Final Space Characters</h1>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <StrictModeDroppable droppableId="characters">
              {(provided) => (
                <ul
                  className="characters"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {characters.map(({ id, name, thumb }, index) => {
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="characters-thumb">
                              <img
                                src={baseUrl + thumb}
                                alt={`${name} Thumb`}
                              />
                            </div>
                            <p>{name}</p>
                            <input type="text" />
                            <button>Some</button>
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </StrictModeDroppable>
          </DragDropContext>
        </header>
        <p>
          Images from{" "}
          <a href="https://final-space.fandom.com/wiki/Final_Space_Wiki">
            Final Space Wiki
          </a>
        </p>
      </div>
    </div>
  );
};

export default TestDrag;
