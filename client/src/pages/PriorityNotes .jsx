import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PriorityNotes = () => {
  const { priority } = useParams();
  const [priorityName, setPriorityName] = useState("");
  const [textColor, setTextColor] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    if (priority === "high") {
      setPriorityName("Critical");
      setTextColor("text-red-400");
    } else if (priority === "mid") {
      setPriorityName("Important");
      setTextColor("text-yellow-400");
    } else if (priority === "low") {
      setPriorityName("Low Importance");
      setTextColor("text-blue-400");
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
    <div>
      <h1 className={`text-[40px] ${textColor}`}>{priorityName} Notes</h1>
      <div className="mt-[50px] flex gap-[20px]">
        {/* Render notes dynamically */}
        {filteredNotes.map((note, index) => (
          <div className="bg-blue-100 p-4 rounded-lg shadow-md w-[300px]"> 
          <h2 className="text-lg font-bold mb-2">Mid Test Exam</h2> 
          <p className="text-gray-700 mb-4">
            Ultrices viverra odio congue lecos felis, libero egestas nunc sagi are masa, elit omare eget sens veb in ullam.
          </p>
          <p className="text-gray-700">
            In augue cursus of adipiscing felis, diam volutpat mauris, id and
          </p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-500">10:30 PM Monday</span>
            <button className="text-blue-500 hover:underline">Edit</button>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default PriorityNotes;
