import React from "react";

interface Props {
  label: string;
  id: string;
  type?: string;
}
const FromInput = ({ label, type,id }: Props) => {
  return (
    <div className="w-full">
      <input
        id={id}
        placeholder={label}
        type={type}
        className={`
                      peer
                      w-full
                      rounded-md
                      border-2 
                      bg-white 
                       p-2
                      font-light
                      outline-none
                      transition
                      disabled:cursor-not-allowed
                      disabled:opacity-70
                    `}
      />
    </div>
  );
};

export default FromInput;
