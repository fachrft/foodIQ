function Input({ label, type, placeholder, value, onChange }) {
  return (
    <div className="mb-4 w-full">
      <label className="block text-gray-700 font-semibold mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        required
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
