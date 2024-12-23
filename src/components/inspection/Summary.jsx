function Summary({ 
  defects, 
  checkedQuantity, 
  goodOutput, 
  defectPieces,
  returnDefectQty = 0
}) {
  const totalDefects = Object.values(defects).reduce((sum, count) => sum + count, 0);
  const defectRate = checkedQuantity > 0 ? (totalDefects / checkedQuantity) * 100 : 0;
  const defectRatio = checkedQuantity > 0 ? (defectPieces / checkedQuantity) * 100 : 0;

  return (
    <div className="bg-white p-4 border-t">
      <div className="grid grid-cols-2 md:grid-cols-7 gap-4 items-center">
        <div>
          <label className="block text-sm font-medium text-gray-700">Defect Qty</label>
          <div className="mt-1 text-2xl font-bold">{totalDefects}</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Checked Qty</label>
          <div className="mt-1 text-2xl font-bold">{checkedQuantity}</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Good Output</label>
          <div className="mt-1 text-2xl font-bold">{goodOutput}</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Defect Pieces</label>
          <div className="mt-1 text-2xl font-bold">{defectPieces}</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Return Defect Qty</label>
          <div className="mt-1 text-2xl font-bold">{returnDefectQty}</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Defect Rate</label>
          <div className="mt-1 text-2xl font-bold">{defectRate.toFixed(2)}%</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Defect Ratio</label>
          <div className="mt-1 text-2xl font-bold">{defectRatio.toFixed(2)}%</div>
        </div>
      </div>
    </div>
  );
}

export default Summary;
