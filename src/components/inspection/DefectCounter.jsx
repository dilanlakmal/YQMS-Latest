function DefectCounter({ count, onIncrement, onDecrement }) {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onDecrement}
        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
        disabled={count === 0}
      >
        -
      </button>
      <input
        type="number"
        value={count}
        readOnly
        className="w-12 text-center border rounded"
      />
      <button
        onClick={onIncrement}
        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
      >
        +
      </button>
    </div>
  );
}

export default DefectCounter;
