const Input = ({label, type='text', value, name, onChange, placeholder, error })=>{
    return(
        <div className="flex flex-col gap-1">
            {label && (
                <label className="text-sm font-medium text-gray-700">{label}</label>
            )}
            <input 
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition ${error ? 'border-red-500' : 'border-gray-300'}`}
            />
            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    )
}

export default Input;