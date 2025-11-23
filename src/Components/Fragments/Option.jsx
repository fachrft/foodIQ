const Option = ({ label, options, value, onChange, className = "" }) => {
    return (
      <div className={`mb-4 ${className}`}>
        <label className="block text-gray-700 font-semibold mb-1">{label}</label>
        <select
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm appearance-none"
          value={value}
          onChange={onChange}
        >
          <option value="" disabled>
            Pilih {label}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default Option;