import { useState } from 'react';

function Header({ inspectionData, editable = false }) {
  const [editedData, setEditedData] = useState(inspectionData || {});

  if (!inspectionData) {
    return (
      <div className="bg-yellow-50 p-4 rounded-lg shadow mb-4">
        <p className="text-yellow-700">No inspection data available. Please start from the Details page.</p>
      </div>
    );
  }

  const handleChange = (field, value) => {
    if (!editable) return;
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const data = editable ? editedData : inspectionData;

  return (
    <div className="overflow-x-auto bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex space-x-4 text-sm">
        {Object.entries(data).map(([key, value]) => (
          <div key={key}>
            <span className="font-medium">{key}: </span>
            {editable ? (
              <input
                type="text"
                value={value}
                onChange={(e) => handleChange(key, e.target.value)}
                className="border-b border-gray-300 focus:border-indigo-500 focus:outline-none"
              />
            ) : (
              <span>{value instanceof Date ? value.toLocaleDateString() : value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Header;
