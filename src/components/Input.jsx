// eslint-disable-next-line no-unused-vars
import React, { useId, forwardRef } from 'react';

// eslint-disable-next-line react/prop-types
const Input = ({ label, type = "text", className = "", value, handleInput, props }, ref) => {

    const id = useId();

    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="mt-2">
                <input
                    ref={ref}
                    id={id}
                    required
                    type={type}
                    value={value}
                    onChange={handleInput}
                    className={`block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`}
                    {...props}
                />
            </div>
        </div>
    )
}

export default forwardRef(Input)
