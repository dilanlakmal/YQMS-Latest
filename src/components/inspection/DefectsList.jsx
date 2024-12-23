import { useState, useEffect } from "react";
import { defectsList } from "../../constants/defects";

function DefectsList({
  view,
  language,
  defects,
  onDefectUpdate,
  onLogEntry,
  isPlaying,
  onDefectSelect,
  currentDefectCount,
  onCurrentDefectUpdate,
  isReturnView = false,
}) {
  const defectItems = defectsList[language];
  const [activeCell, setActiveCell] = useState(null);

  // Check for any active defects whenever currentDefectCount changes
  useEffect(() => {
    const hasActiveDefects = Object.values(currentDefectCount).some(
      (count) => count > 0
    );
    onDefectSelect(hasActiveDefects);
  }, [currentDefectCount, onDefectSelect]);

  const handleDefectChange = (index, isIncrement) => {
    if (!isPlaying) return;

    const currentValue = currentDefectCount[index] || 0;
    if (!isIncrement && currentValue === 0) return;

    const newValue = isIncrement
      ? currentValue + 1
      : Math.max(0, currentValue - 1);

    onCurrentDefectUpdate(index, newValue);
    onLogEntry?.({
      type: isIncrement ? "defect-add" : "defect-remove",
      defectName: defectItems[index],
      count: isIncrement ? 1 : -1,
      timestamp: new Date().getTime(),
    });
  };

  if (view === "grid") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {defectItems.map((defect, index) => (
          <div
            key={index}
            className={`relative p-4 border rounded-lg bg-white shadow-sm cursor-pointer select-none hover:shadow-md transition-shadow ${
              !isPlaying ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => isPlaying && handleDefectChange(index, true)}
            onMouseEnter={() => setActiveCell(index)}
            onMouseLeave={() => setActiveCell(null)}
          >
            {defects[index] > 0 && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">
                {defects[index]}
              </div>
            )}

            <div className="mb-2 text-sm">{defect}</div>

            {currentDefectCount[index] > 0 && (
              <div className="absolute bottom-2 left-2 text-sm font-medium">
                {currentDefectCount[index]}
              </div>
            )}

            {activeCell === index && isPlaying && (
              <div className="absolute top-2 right-2 flex space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDefectChange(index, false);
                  }}
                  className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                  disabled={!currentDefectCount[index]}
                >
                  -
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDefectChange(index, true);
                  }}
                  className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {defectItems.map((defect, index) => (
        <div
          key={index}
          className={`flex justify-between items-center p-4 bg-white rounded-lg shadow-sm ${
            !isPlaying ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <span className="text-sm flex-grow">{defect}</span>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                disabled={!isPlaying || !currentDefectCount[index]}
                onClick={() => handleDefectChange(index, false)}
                className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                -
              </button>
              <input
                type="text"
                value={currentDefectCount[index] || 0}
                readOnly
                className="w-16 text-center border rounded p-1"
              />
              <button
                disabled={!isPlaying}
                onClick={() => handleDefectChange(index, true)}
                className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                +
              </button>
            </div>
            <div className="w-16 text-center">{defects[index] || 0}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DefectsList;
