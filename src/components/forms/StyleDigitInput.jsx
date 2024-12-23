function StyleDigitInput({ value, onChange }) {
  const handleChange = (e) => {
    const newValue = e.target.value.replace(/[^0-9a-zA-Z-]/g, '');
    onChange(newValue);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Style Digit
      </label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Enter Style Digit"
      />
    </div>
  );
}

export default StyleDigitInput;
