import React, { useState } from "react";
import { IoIosDocument } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import "./styles/Notes.css";
import { Link } from "react-router-dom";

const Notes = () => {
  const [showPriorities, setShowPriorities] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const priorities = [
    {
      priority: "Critical",
      description:
        "Tasks that must be addressed immediately and cannot be delayed.",
      color: "red",
      extendedWidth: "384px",
      type: "high",
    },
    {
      priority: "Important",
      description:
        "Tasks that should be completed soon but can be postponed if necessary.",
      color: "yellow",
      extendedWidth: "412px",
      type: "mid",
    },
    {
      priority: "Low Importance",
      description: "Tasks that are not urgent and can be done at a later time.",
      color: "blue",
      extendedWidth: "335px",
      type: "low",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-semibold">Find your priority</h1>
        {showPriorities ? (
          <MdKeyboardArrowUp
            className="text-[28px] cursor-pointer"
            onClick={() => setShowPriorities(false)}
          />
        ) : (
          <MdKeyboardArrowDown
            className="text-[28px] cursor-pointer"
            onClick={() => setShowPriorities(true)}
          />
        )}
      </div>
      {showPriorities && (
        <div className="flex gap-[20px] mt-[30px] overflow-hidden">
          {priorities.map((item, index) => {
            const bgColor = `bg-${item.color}-100`;
            const hoverBgColor = `hover:bg-${item.color}-200`;
            const fileColor = `text-${item.color}-400`;

            return (
              <Link
                to={`/notes/priority/${item.type}`}
                className={`rounded-xl ${bgColor} ${hoverBgColor} p-3 flex flex-col relative !transition-width duration-300 cursor-pointer dropDownAnimation`}
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  width: hoveredIndex === index ? item.extendedWidth : "250px",
                  transition: "width 0.3s ease-in-out",
                }}
              >
                <IoIosDocument
                  className={`text-[50px] mb-[30px] ${fileColor}`}
                />
                <span className="font-semibold text-[20px] ml-[8px] mb-[5px]">
                  {item.priority}
                </span>
                <span className="ml-[8px] text-[12px] mb-[10px] line-clamp-1">
                  {item.description}
                </span>
              </Link>
            );
          })}
        </div>
      )}

      <div className="flex gap-5 mt-[40px]">
        <h1 className="text-[15px] font-light border-b-[1px] border-black">
          Today
        </h1>
        <h1 className="text-[15px] font-light text-gray-400">Previous</h1>
      </div>
    </div>
  );
};

export default Notes;
