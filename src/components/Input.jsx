import React from 'react';
import Error from './Error';

function Input({ name, type = 'text', onChange, error }) {
  return (
    <>
      <input
        type={type}
        name={name}
        id={name}
        className={`border border-grey-500 rounded-sm block my-2 w-full h-9 hover:cursor-pointer focus:outline-none focus:border-green-600 ${error && 'border-red focus:border-red'}`}
        autoComplete={name}
        onChange={(e) => onChange(name, e.target.value)}
      />
      <Error message={error} />
    </>
  );
}

export default Input;
