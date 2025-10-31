import React from "react";

const CommonTitle = ({ text, customIcon }) => {
  return (
    <div>
      <h1 className="flex items-center gap-2 text-[20px] md:text-[28px] font-medium font-degular text-primary">
        <div className="bg-primary h-0.5 w-6"></div> {text}
      </h1>
    </div>
  );
};

export default CommonTitle;
