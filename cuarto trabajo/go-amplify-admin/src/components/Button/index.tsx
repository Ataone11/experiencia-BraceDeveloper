import React from 'react'

interface ButtonProps {
    text: string,
    onClick: () => void
    type?: "submit" | "button",
    className?: string,
    theme?: "primary" | "cancel"
}

const Button = ({ text, onClick, type = "button", className = "", theme = "primary" }: ButtonProps) => {

    const getTheme = () => {
        switch (theme) {
            case "primary":
                return "bg-primary-button-bg text-primary-button-text";
            case "cancel":
                return "bg-cancel-button-bg text-cancel-button-text border-2 border-cancel-button-border";
            default:
                break;
        }
    }

    return (
        <button
            className={
                `${getTheme()} flex justify-center text-base rounded-md py-2 px-2 font-myriad w-[184px] align-middle text-center ${className}`
            }
            onClick={onClick}
            type={type}
        >
            {text}
        </button>
    )
}

export default Button