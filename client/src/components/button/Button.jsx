import React from 'react'
import myStyles from './Button.module.css'
const Button = ({ children, handleClick, styleClass }) => {
    return (
        <button
            onClick={handleClick}
            className={`${myStyles.btn} ${styleClass}`}
        >
            {children}
        </button>
    )
}

export default Button