import React from 'react'
import "../pages/styles/PriorityNotes.css";


const NoteComponent = ({key,title,date,description,index,noteColor}) => {
  return (
    <div
    key={key}
    className={`${noteColor} select-none note p-[40px] opacity-0 w-fit fadeInAnimationCards cursor-pointer  shadow-md transition-all max-h-[fit] duration-300 hover:scale-105 relative`}
    style={{
      animationDelay: `${index * 0.2}s`,
    }}
  >
    <h2 className="text-xl capitalize mb-2">{title}</h2>
    <span className="text-[12px] text-black mb-8 block">{date}</span>
    
    <p className="text-black mb-[30px] ml-[20px] text-sm w-[200px]">
      {description}
    </p>
    <div className="edit-box opacity-0 flex justify-end gap-3 items-end mt-4 absolute bottom-0 right-0 p-[20px] pb-[10px] transition-all duration-300 ">
      <button className="text-blue-500 hover:underline">Edit</button>
      <button className="text-red-500 hover:underline">Delete</button>
    </div>
  </div>
  )
}

export default NoteComponent
