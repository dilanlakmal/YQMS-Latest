import { FaList, FaThLarge } from 'react-icons/fa';

function ViewToggle({ view, onViewChange, onLanguageChange }) {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex space-x-2">
        <button
          onClick={() => onViewChange('list')}
          className={`p-2 rounded ${
            view === 'list' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
          }`}
        >
          <FaList />
        </button>
        <button
          onClick={() => onViewChange('grid')}
          className={`p-2 rounded ${
            view === 'grid' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
          }`}
        >
          <FaThLarge />
        </button>
      </div>
      
      <select
        onChange={(e) => onLanguageChange(e.target.value)}
        className="border rounded p-2"
      >
        <option value="english">English</option>
        <option value="khmer">Khmer</option>
        <option value="chinese">Chinese</option>
        <option value="all">All Languages</option>
      </select>
    </div>
  );
}

export default ViewToggle;
