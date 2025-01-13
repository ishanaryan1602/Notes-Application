import React, { useEffect, useState } from "react";
import { IoIosDocument } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import "./styles/Notes.css";
import { Link } from "react-router-dom";
import axios from "axios";
import NoteComponent from "../components/NoteComponent";
import "./styles/Notes.css";
import { FaPlus } from "react-icons/fa6";

const Notes = () => {
  let [filteredNotes, setFilteredNotes] = useState([]);
  const [showByDate, setShowByDate] = useState("today");
  const [showHoverAnimation, setShowHoverAnimation] = useState(false);

  const priorities = [
    {
      priority: "Critical",
      description:
        "Tasks that must be addressed immediately and cannot be delayed.",
      color: "red",
      bgColor: `bg-red-100`,
      fileColor: `text-red-400`,
      extendedWidth: "384px",
      type: "high",
    },
    {
      priority: "Important",
      description:
        "Tasks that should be completed soon but can be postponed if necessary.",
      color: "yellow",
      bgColor: `bg-yellow-100`,
      fileColor: `text-yellow-400`,
      extendedWidth: "412px",
      type: "mid",
    },
    {
      priority: "Low Importance",
      description: "Tasks that are not urgent and can be done at a later time.",
      color: "blue",
      bgColor: `bg-blue-100`,
      fileColor: `text-blue-400`,
      extendedWidth: "335px",
      type: "low",
    },
  ];

  const fetchFilteredNotes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/note/allNotes`,
        { withCredentials: true }
      );
      setFilteredNotes(response.data.notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchFilteredNotes();
  }, []);

  // Filter notes by today's date
  const filterNotesByDate = (notes, dateFilter) => {
    const currentDate = new Date();
    const today = currentDate.getDate().toString();

    if (dateFilter === "today") {
      return notes.filter((note) => {
        const noteDate = new Date(note.createdAt).getDate().toString();
        return noteDate === today;
      });
    }
    if (dateFilter === "previous") {
      return notes.filter((note) => {
        const noteDate = new Date(note.createdAt).getDate().toString();
        return noteDate !== today;
      });
    }
    return notes; // If "previous", return all notes (or you can add more filters for previous notes).
  };

  const filteredTodayNotes = filterNotesByDate(filteredNotes, showByDate);

  return (
    <div className="relative min-h-[85vh]">
      <Link
        to="/create-note"
        className={`bg-slate-100 text-[20px] transition-all duration-300 w-[60px] h-[60px] absolute right-0 bottom-[0%] flex justify-center items-center rounded-full overflow-hidden cursor-pointer`}
        onMouseEnter={() => setShowHoverAnimation(true)}
        onMouseLeave={() => setShowHoverAnimation(false)}
      >
        <FaPlus
          className={`text-gray-600 ${
            showHoverAnimation && "spinAnimation"
          } `}
        />
      </Link>
      <div className="flex items-center justify-between">
        <h1 className="text-[30px] font-semibold">Find your priority</h1>
      </div>

      <div className="flex gap-[20px] overflow-hidden ">
        {priorities.map((item, index) => {
          return (
            <Link
              to={`/notes/priority/${item.type}`}
              className={`rounded-xl ${item.bgColor} select-none p-3 my-[20px] flex flex-col relative shadow-md !transition-width duration-300 cursor-pointer dropDownAnimation`}
              key={index}
            >
              <IoIosDocument
                className={`text-[50px] mb-[30px] ${item.fileColor}`}
              />
              <span className="font-semibold text-[20px] ml-[8px] mb-[5px]">
                {item.priority}
              </span>
              <span className="ml-[8px] text-[12px] mb-[10px] w-[200px]">
                {item.description}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="flex gap-5 mt-[40px]">
        <h1
          className={`text-[15px] cursor-pointer font-light ${
            showByDate === "today"
              ? "text-black border-b-[1px] border-black"
              : "text-gray-400"
          } `}
          onClick={() => setShowByDate("today")}
        >
          Today
        </h1>
        <h1
          className={`text-[15px] cursor-pointer font-light ${
            showByDate === "previous"
              ? "text-black border-b-[1px] border-black"
              : "text-gray-400"
          } `}
          onClick={() => setShowByDate("previous")}
        >
          Previous
        </h1>
      </div>

      <div className="notes-container w-full mt-[10px] overflow-x-scroll overflow-y-hidden relative">
        <div className="flex gap-[20px] my-[20px]">
          {filteredTodayNotes.map((note, index) => {
            const dateStr = note.createdAt;
            const formattedDate = new Date(dateStr).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            return (
              <>
                <NoteComponent
                  key={note._id}
                  title={note.title}
                  date={formattedDate}
                  description={note.description}
                  index={index}
                  noteColor={note.noteColor}
                />
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Notes;
