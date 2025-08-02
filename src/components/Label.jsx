import React from 'react';

function Label({ name, children }) {
  return (
    <label htmlFor={name} className='mt-2 inline-block'>
      {children} <span className='text-green-600'>*</span>
    </label>
  );
}

export default Label;
