const Button = ({children, onClick, type='button', variant='primary', disabled = false})=>{
    const base = "px-4 py-2 rounded-lg font-medium transaction-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        danger: "bg-red-500 text-white hover:bg-red-600",
        ghost: "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }

    return(
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${base} ${variants[variant]}`}
        >
            {children}
        </button>
    )
}

export default Button;