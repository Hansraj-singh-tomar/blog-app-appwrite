// eslint-disable-next-line no-unused-vars
import React, { forwardRef, useId } from 'react'

// eslint-disable-next-line react/prop-types
const Select = ({ options, className = '', defaultValue, label, props }, ref) => {
    const id = useId();
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <select ref={ref} defaultValue={defaultValue} {...props} id={id} className={`${className} block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}>
                {
                    // eslint-disable-next-line react/prop-types
                    options?.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}

export default forwardRef(Select)
