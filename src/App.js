import React, { useState } from "react";
const Sidebar = React.lazy(()=>"./components/Sidebar");
import MidArea from "./components/MidArea";
const PreviewArea = React.lazy(()=>"./components/PreviewArea");
import { DndProvider} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
const MoveableItems = React.lazy(()=>'./components/hooks/MoveableItem');
const COLUMN_NAMES = {
  DO_IT: "Do it",
  IN_PROGRESS: "In Progress",
  AWAITING_REVIEW: "Awaiting review",
  DONE: "Done"
};
const { DO_IT, IN_PROGRESS, AWAITING_REVIEW, DONE } = COLUMN_NAMES;

export default function App() {

  const [midArea, setmidArea] = useState(true)
  return (
    <div className="bg-blue-100 pt-6 font-sans">
      <div className="h-screen overflow-hidden flex flex-row  ">
      <DndProvider backend={HTML5Backend}>
        <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
          <div>
        <MoveableItems title={"Motion"} className="column do-it-column">
          {Sidebar(DO_IT)}
        </MoveableItems>

        <MoveableItems title={"looks"} className="column do-it-column">
          {Sidebar(DO_IT)}
        </MoveableItems>
        <MoveableItems title={"control"} className="column do-it-column">
          {Sidebar(DO_IT)}
        </MoveableItems>
        <MoveableItems title={"events"} className="column do-it-column">
          {Sidebar(DO_IT)}
        </MoveableItems>
        </div>
        <MoveableItems title={IN_PROGRESS} midArea={midArea} className="flex justify-center">
         {Sidebar(IN_PROGRESS,midArea)}
        </MoveableItems>
        </div>
        </DndProvider>
        <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
          <PreviewArea />
        </div>
      </div>
    </div>
  );
}
