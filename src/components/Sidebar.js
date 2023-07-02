import React, { useState, useRef,useEffect } from "react";
import Button from './Button';


 const COLUMN_NAMES = {
  DO_IT: "Do it",
  IN_PROGRESS: "In Progress",
  AWAITING_REVIEW: "Awaiting review",
  DONE: "Done"
};
const { DO_IT,IN_PROGRESS } = COLUMN_NAMES;

const tasks = [
  {id: 1, name: 'Item 1', column: DO_IT},
  {id: 2, name: 'Item 2', column: DO_IT},
  {id: 3, name: 'Item 3', column: DO_IT}
];

const Sidebar =(columnName,midArea)=> {
  const [items, setItems] = useState(tasks);


  useEffect(() => {
    console.log(items);
  },[items])
  
  const moveCardHandler = (dragIndex, hoverIndex) => {
    const dragItem = items[dragIndex];
    if (dragItem) {
      setItems((prevState) => {
        const coppiedStateArray = [...prevState];
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);
        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);
        return coppiedStateArray;
      });
    }
  };
  return (
<div className={`w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2  ${midArea ? '' : 'border-r-8'}`}>
    {items.filter((item) => item.column === columnName).map((item, index) => (
        <Button
          key={item.id}
          name={item.name}
          currentColumnName={item.column}
          setItems={setItems}
          items={items}
          index={index}
          moveCardHandler={moveCardHandler}
        />
      )
      )}
   </div>
  );
}

export default Sidebar;