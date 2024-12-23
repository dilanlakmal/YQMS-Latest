import { useState } from 'react';

function ControlButtons({ onPass, onReject, onCheckedQtyChange }) {
  const [isOnActive, setIsOnActive] = useState(false);
  const [isReturnActive, setIsReturnActive] = useState(false);

  const handleOnClick = () => {
    setIsOnActive(!isOnActive);
  };

  const handleReturnClick = () => {
    setIsReturnActive(!isReturnActive);
  };

  const handlePass = () => {
    onPass();
    if (!isReturnActive) {
      onCheckedQtyChange(qty => qty + 1);
    }
    setIsOnActive(false);
  };

  const handleReject = () => {
    onReject();
    if (!isReturnActive) {
      onCheckedQtyChange(qty => qty + 1);
    }
    setIsOnActive(false);
    setIsReturnActive(false);
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handleOnClick}
        className={`px-4 py-2 rounded font-medium transition-colors ${
          isOnActive ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'
        }`}
      >
        ON
      </button>
      <button
        onClick={handlePass}
        className="px-4 py-2 bg-blue-500 text-white rounded font-medium hover:bg-blue-600"
      >
        Pass
      </button>
      <button
        onClick={handleReject}
        className="px-4 py-2 bg-red-500 text-white rounded font-medium hover:bg-red-600"
      >
        Reject
      </button>
      <button
        onClick={handleReturnClick}
        className={`px-4 py-2 rounded font-medium transition-colors ${
          isReturnActive ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'
        }`}
      >
        Return
      </button>
    </div>
  );
}

export default ControlButtons;
