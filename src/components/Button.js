import React from "react";
import Icon from "./Icon";
import { memo,useRef } from "react";
import { useDrag, useDrop } from "react-dnd";



const itemss = {
  "border-radius": "5px",
  "background-color": "#fafdff",
  height: "100px",
  width: "140px",
  margin: "10px auto",
  display: "flex",
  "justify-content": "center",
  "align-items": "center",
  "box-shadow": "0px 0px 3px rgba(0, 0, 0, 0.5)"
};

const COLUMN_NAMES = {
  DO_IT: "Do it",
  IN_PROGRESS: "In Progress",
  AWAITING_REVIEW: "Awaiting review",
  DONE: "Done"
};  

 const Button = ({
  name,
  index,
  currentColumnName,
  moveCardHandler,
  setItems,
  items
}) => {
  const changeItemColumn = (currentItem, columnName) => {
    setItems((prevState) => {
      return prevState.map((e) => {
        return {
          ...e,
          column: e.name === currentItem.name ? columnName : e.column
        };
      });
    });
  };

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "CARD",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveCardHandler(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });
  
  

  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { index, currentColumnName, type: "CARD" },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
  
      if (dropResult) {
        const { name } = dropResult;
        const { DO_IT, IN_PROGRESS, AWAITING_REVIEW, DONE } = COLUMN_NAMES;
        switch (name) {
          case DO_IT:
            changeItemColumn(item, DO_IT);
            break;
          case IN_PROGRESS:
            changeItemColumn(item, IN_PROGRESS);
            break;
          default:
            break;
        }
       
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });
  

  const opacity = isDragging ? 0.4 : 1;

  drag(drop(ref));

  return (
    <div ref={ref} className={itemss} style={{ opacity }}>
       <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
      {name}
      </div>
    </div>
  );
};
export default Button;