import { factories } from '../../constants/defects';

function FactorySelect({ value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Factory
      </label>
      <select
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="">Select Factory</option>
        {factories.map((factory) => (
          <option key={factory} value={factory}>
            {factory}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FactorySelect;
