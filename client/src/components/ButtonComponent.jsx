import React from "react";

const ButtonComponent = ({ content }) => {
  return (
    <div className={`cursor-pointer w-full text-[15px] p-2 px-3 bg-black text-white border-[1px] border-black hover:border-black hover:text-black hover:bg-white duration-300 transition-all `}>
      {content}
    </div>
  );
};

export default ButtonComponent;
