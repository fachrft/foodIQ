function Input({ label, type, placeholder, value, onChange, className = "" }) {
  return (
    <div className={`mb-4 w-full ${className}`}>
      <label className="block text-gray-700 font-semibold mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 shadow-sm"
        required
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
