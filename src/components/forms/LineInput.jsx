function LineInput({ value, onChange }) {
  const handleChange = (e) => {
    const newValue = e.target.value.toUpperCase().replace(/\s+/g, '');
    onChange(newValue);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Line No
      </label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Enter Line Number"
      />
    </div>
  );
}

export default LineInput;
