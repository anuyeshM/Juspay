import React from "react";
import {useDrop } from "react-dnd";
import { memo } from "react";


const COLUMN_NAMES = {
  DO_IT: "Do it",
  IN_PROGRESS: "In Progress",
  AWAITING_REVIEW: "Awaiting review",
  DONE: "Done"
};

 const MoveableItems = ({ children, className, title, midArea }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "CARD",
    drop: () => ({ name: title }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    // Override monitor.canDrop() function
    canDrop: (item) => {
      const { DO_IT, IN_PROGRESS, AWAITING_REVIEW, DONE } = COLUMN_NAMES;
      const { currentColumnName } = item;
      return (
        currentColumnName
      );
    }
  });

  const getBackgroundColor = () => {
    if (isOver) {
      if (canDrop) {
        return "rgb(188,251,255)";
      } else if (!canDrop) {
        return "green";
      }
    } else {
      return "";
    }
  };

  return (
    <div
      ref={drop}
      className={className}
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <div className={`flex justify-center ${midArea ? 'w-60' : ''}`}>{title}</div>
      {children}
    </div>
  );
};

export default memo(MoveableItems);