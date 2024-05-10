// eslint-disable-next-line no-unused-vars
import React from 'react'

// eslint-disable-next-line react/prop-types
const Button = ({ type = "button", bgColor = "bg-indigo-600", textColor = "text-white", onClick, className = "", children }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`flex w-full justify-center rounded-md px-4 py-1.5 text-lg font-semibold leading-6 ${bgColor} ${textColor} shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${className}`}
        >
            {children}
        </button>
    )
}

export default React.memo(Button)
