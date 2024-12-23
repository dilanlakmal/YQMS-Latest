import { styleCodes } from '../../constants/defects';

function StyleCodeSelect({ value, onChange, onCustomerChange }) {
  const handleChange = (e) => {
    const selectedCode = e.target.value;
    onChange(selectedCode);
    
    const customer = styleCodes.find(style => style.code === selectedCode)?.customer || '';
    onCustomerChange(customer);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Style Code
      </label>
      <select
        value={value}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="">Select Style Code</option>
        {styleCodes.map(({ code }) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>
    </div>
  );
}

export default StyleCodeSelect;
