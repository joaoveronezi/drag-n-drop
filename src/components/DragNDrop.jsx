import React, { useRef, useState } from "react";

const DragNDrop = ({ data }) => {
  const [list, setList] = useState(data);
  const [isDragging, setIsDragging] = useState(false);

  const dragItem = useRef();
  const dragNode = useRef();

  const handleDragEnd = () => {
    setIsDragging(false);
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  };

  const handleDragStart = (e, params) => {
    dragItem.current = params;
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", handleDragEnd);
    setTimeout(() => {
      setIsDragging(true);
    }, 0);
  };

  const handleDragEnter = (e, params) => {
    const currentItem = dragItem.current;
    if (e.target !== dragNode.current) {
      setList((oldList) => {
        const newList = JSON.parse(JSON.stringify(oldList));

        newList[params.grpIndex].items.splice(
          params.itemIndex,
          0,
          newList[currentItem.grpIndex].items.splice(
            currentItem.itemIndex,
            1
          )[0]
        );
        dragItem.current = params;
        return newList;
      });
    }
  };

  const getStyles = ({ grpIndex, itemIndex }) => {
    const currentItem = dragItem.current;

    if (
      currentItem.grpIndex === grpIndex &&
      currentItem.itemIndex === itemIndex
    ) {
      return "current dnd-item";
    }
    return "dnd-item";
  };

  return (
    <div className="drag-n-drop">
      {list.map((grp, grpIndex) => (
        <div
          key={grp.title}
          className="dnd-group"
          onDragEnter={
            isDragging && !grp.items.length
              ? (e) => handleDragEnter(e, { grpIndex, itemIndex: 0 })
              : null
          }
        >
          <div className="group-title">{grp.title}</div>
          {grp.items.map((item, itemIndex) => (
            <div
              draggable
              onDragStart={(e) => handleDragStart(e, { grpIndex, itemIndex })}
              onDragEnter={
                isDragging
                  ? (e) => handleDragEnter(e, { grpIndex, itemIndex })
                  : null
              }
              key={item}
              className={
                isDragging ? getStyles({ grpIndex, itemIndex }) : "dnd-item"
              }
            >
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DragNDrop;
