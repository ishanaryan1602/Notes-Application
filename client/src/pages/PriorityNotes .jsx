import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PriorityNotes = () => {
  const { priority } = useParams();
  const [priorityName, setPriorityName] = useState("");
  const [textColor, setTextColor] = useState("");
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
  }, []);

  return (
    <div>
      <h1 className={`text-[40px] ${textColor} `}>{priorityName} Notes</h1>
    </div>
  );
};

export default PriorityNotes;
