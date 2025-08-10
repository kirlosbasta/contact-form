import { useRef, useState } from "react";

function Radio({ value, name, children, checked, onChange }) {
  const input = useRef(null);

  function handleClick() {
    input.current.checked = true;
    onChange(name, value);
  }
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`border border-grey-500 rounded-sm my-2 px-5 w-full h-9 hover:cursor-pointer focus:outline-none focus:border-green-600 flex items-center ${
        checked && "bg-green-200"
      }`}
    >
      <input
        type="radio"
        name={name}
        id={value}
        checked={checked}
        value={value}
        ref={input}
        className="hover:cursor-pointer focus:outline-none accent-green-600"
        autoComplete={name}
      />
      <label
        htmlFor={value}
        className="ml-3 hover:cursor-pointer focus:outline-none"
      >
        {children}
      </label>
    </button>
  );
}

export default Radio;
