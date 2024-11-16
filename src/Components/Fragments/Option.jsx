const Option = ({ label, options, value, onChange }) => {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-1">{label}</label>
        <select
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
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
  