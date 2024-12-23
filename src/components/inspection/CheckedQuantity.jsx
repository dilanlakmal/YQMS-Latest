import { useState } from 'react';
import { Menu } from '@headlessui/react';
import { FaChevronDown } from 'react-icons/fa';

const multipliers = [2, 3, 4, 5, 10, 15, 20, 25, 30, 40, 50, 100];

function CheckedQuantity({ value, onChange, onLogEntry }) {
  const [multiplier, setMultiplier] = useState(1);
  const [inputValue, setInputValue] = useState('');

  const handleIncrement = () => {
    onChange(value + multiplier);
    onLogEntry({
      type: 'output-add',
      quantity: multiplier,
      timestamp: new Date().getTime()
    });
  };

  const handleDecrement = () => {
    if (value >= multiplier) {
      onChange(value - multiplier);
      onLogEntry({
        type: 'output-remove',
        quantity: multiplier,
        timestamp: new Date().getTime()
      });
    }
  };

  const handleAddValue = () => {
    const numValue = parseInt(inputValue);
    if (!isNaN(numValue) && numValue > 0) {
      onChange(value + numValue);
      onLogEntry({
        type: 'output-add',
        quantity: numValue,
        timestamp: new Date().getTime()
      });
      setInputValue('');
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center">
        <button
          onClick={handleDecrement}
          className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-l hover:bg-gray-300"
        >
          -
        </button>
        <input
          type="text"
          value={value}
          readOnly
          className="w-20 text-center border-y h-8"
        />
        <button
          onClick={handleIncrement}
          className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-r hover:bg-gray-300"
        >
          +
        </button>
      </div>

      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center px-3 py-1 bg-gray-100 rounded border hover:bg-gray-200">
          {multiplier}x <FaChevronDown className="ml-1" />
        </Menu.Button>
        <Menu.Items className="absolute z-10 mt-1 w-24 bg-white rounded-md shadow-lg py-1 max-h-48 overflow-auto">
          {multipliers.map((m) => (
            <Menu.Item key={m}>
              {({ active }) => (
                <button
                  onClick={() => setMultiplier(m)}
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } w-full text-left px-4 py-2 text-sm`}
                >
                  {m}x
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>

      <div className="flex items-center space-x-1">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Value"
          className="w-20 h-8 px-2 border rounded"
        />
        <button
          onClick={handleAddValue}
          className="px-3 h-8 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default CheckedQuantity;
