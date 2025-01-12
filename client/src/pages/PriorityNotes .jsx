import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import "./styles/PriorityNotes.css";
import NoteComponent from "../components/NoteComponent";

const PriorityNotes = () => {
  const { priority } = useParams();
  const [priorityName, setPriorityName] = useState("");
  const [textColor, setTextColor] = useState("");
  const [noteColor, setNoteColor] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    if (priority === "high") {
      setPriorityName("Critical");
      setTextColor("text-red-500");
      setNoteColor(`bg-[rgb(255,240,240)]`);
    } else if (priority === "mid") {
      setPriorityName("Important");
      setTextColor("text-yellow-500");
      setNoteColor(`bg-yellow-50`);
    } else if (priority === "low") {
      setPriorityName("Low Importance");
      setTextColor("text-blue-500");
      setNoteColor(`bg-[rgb(245,245,255)]`);
    }
  }, [priority]);

  const fetchFilteredNotes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/note/allNotes?priority=${priority}`,
        { withCredentials: true }
      );
      setFilteredNotes(response.data.notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchFilteredNotes();
  }, [priority]);

  useEffect(() => {
    console.log("The note is", filteredNotes);
  }, [filteredNotes]);

  return (
    <div className="min-h-[85vh] relative">
      <span className={`${noteColor} text-[20px] transition-all duration-300 w-fit h-fit absolute right-0 bottom-0 flex justify-center items-center p-[18px] rounded-full hover:shadow-lg cursor-pointer hover:scale-110 `}>
      <FaPlus className={`${textColor} font-extralight `} />
      </span>
      <h1 className={`text-[40px] ${textColor}`}>{priorityName} Notes</h1>
      <span className="flex itesm-center text-sm text-gray-400 ">
        <Link
          to="/notes"
          className="flex items-center justify-start text-gray-500 hover:text-black transition-all duration-200"
        >
          Notes
          <BiChevronRight className="mt-[2px] mr-[2px] " />
        </Link>
        {priorityName} notes
      </span>
      <div className="mt-[50px] flex gap-[20px] flex-wrap">
        {filteredNotes.map((note, index) => {
          const dateStr = note.createdAt;
          const options = {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
            weekday: "long",
          };
          const formattedDate = new Date(dateStr).toLocaleString(
            "en-US",
            options
          );

          return (
            <NoteComponent key={note._id} title={note.title} date={formattedDate} description={note.description} index={index} noteColor={noteColor} />
          );
        })}
      </div>
    </div>
  );
};

export default PriorityNotes;
