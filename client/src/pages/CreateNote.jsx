import React, { useState } from "react";
import "./styles/CreateNote.css";

const CreateNote = () => {
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedNoteColor, setSelectedNoteColor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const priorityArray = [
    {
      inputValue: "high",
      labelValue: "Critical",
    },
    {
      inputValue: "mid",
      labelValue: "Important",
    },
    {
      inputValue: "low",
      labelValue: "Low Importance",
    },
  ];

  const noteColorArray = [
    { colorCode: "bg-slate-100", colorBaseName: "Slate" },
    { colorCode: "bg-gray-100", colorBaseName: "Gray" },
    { colorCode: "bg-zinc-100", colorBaseName: "Zinc" },
    { colorCode: "bg-neutral-100", colorBaseName: "Neutral" },
    { colorCode: "bg-stone-100", colorBaseName: "Stone" },
    { colorCode: "bg-red-100", colorBaseName: "Red" },
    { colorCode: "bg-orange-100", colorBaseName: "Orange" },
    { colorCode: "bg-amber-100", colorBaseName: "Amber" },
    { colorCode: "bg-yellow-100", colorBaseName: "Yellow" },
    { colorCode: "bg-lime-100", colorBaseName: "Lime" },
    { colorCode: "bg-green-100", colorBaseName: "Green" },
    { colorCode: "bg-emerald-100", colorBaseName: "Emerald" },
    { colorCode: "bg-teal-100", colorBaseName: "Teal" },
    { colorCode: "bg-cyan-100", colorBaseName: "Cyan" },
    { colorCode: "bg-sky-100", colorBaseName: "Sky" },
    { colorCode: "bg-blue-100", colorBaseName: "Blue" },
    { colorCode: "bg-indigo-100", colorBaseName: "Indigo" },
    { colorCode: "bg-violet-100", colorBaseName: "Violet" },
    { colorCode: "bg-purple-100", colorBaseName: "Purple" },
    { colorCode: "bg-fuchsia-100", colorBaseName: "Fuchsia" },
    { colorCode: "bg-pink-100", colorBaseName: "Pink" },
    { colorCode: "bg-rose-100", colorBaseName: "Rose" },
  ];

  const setPriority = (e) => {
    setSelectedPriority(e.target.value);
  };
  const changeTitle = (e) => {
    setTitle(e.target.value);
  };
  const changeDescription = (e) => {
    setDescription(e.target.value);
  };
  const clearFields = (e) => {
    e.preventDefault();
    setTitle("");
    setDescription("");
    setSelectedPriority("");
    setSelectedNoteColor("");
  };

  const currentDate = new Date();
  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const date = currentDate.getDate();
  const year = currentDate.getFullYear();

  return (
    <>
      <div className="flex gap-[30px] items-start justify-center">
        <div
          className={`shadow-md note-body my-[50px] flex flex-col p-[30px] relative w-1/3 ${selectedNoteColor}`}
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            className="text-[30px] border-slate-200 p-0 m-0 mb-[10px] outline-none bg-transparent"
            onChange={changeTitle}
          />
          <div className="flex gap-[5px] text-sm">
            <span>{monthName}</span>
            <span>{date},</span>
            <span>{year}</span>
          </div>
          <textarea
            className="bg-transparent textarea_class min-h-[25vh] mt-[20px] ml-[40px] outline-none mb-[20px]"
            placeholder="Description"
            value={description}
            onChange={changeDescription}
          />
        </div>

        <div className="w-1/4">
          <div
            className={`shadow-md note-body my-[50px] flex flex-col p-[30px] relative w-full `}
          >
            <p>Select Priority</p>
            <hr className="my-[20px]" />
            <div className="flex flex-col gap-[5px]">
              {priorityArray.map((item, index) => {
                return (
                  <div className="flex gap-[5px]">
                    <input
                      type="checkbox"
                      value={item.inputValue}
                      onChange={setPriority}
                      checked={selectedPriority === item.inputValue}
                      className="cursor-pointer"
                    />
                    <label className="text-[15px]">{item.labelValue}</label>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className={`shadow-md note-body my-[50px] flex flex-col p-[30px] relative w-full`}
          >
            <p>Select Note Color</p>
            <hr className="my-[30px] mt-[20px]" />
            <div className="flex gap-5 flex-wrap">
              {noteColorArray.map((item, index) => {
                return (
                  <div className="flex gap-[4px]">
                    <div
                      className={`w-[14px] h-[14px] ${item.colorCode} hover:scale-[2] hover:mx-2 transition-all duration-300 rounded-[3px] cursor-pointer `}
                      onClick={()=>setSelectedNoteColor(item.colorCode)}
                    ></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-[10px] mb-[10px] items-center w-1/2 mx-auto">
        <button
          className="p-[10px] bg-white border-black border-[1px] hover:bg-black hover:text-white hover:tracking-widest transition-all duration-300 w-1/2"
          onClick={clearFields}
        >
          Clear
        </button>
        <button className="p-[10px] bg-white border-black border-[1px] hover:bg-black hover:text-white hover:tracking-widest transition-all duration-300 w-1/2">
          Create Note
        </button>
      </div>
    </>
  );
};

export default CreateNote;

// store note dets into the local storage to persist accross relaads
