function PreviewHeader({ inspectionData }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p><span className="font-semibold">Date:</span> {inspectionData.date.toLocaleDateString()}</p>
          <p><span className="font-semibold">Factory:</span> {inspectionData.factory}</p>
          <p><span className="font-semibold">Line No:</span> {inspectionData.lineNo}</p>
        </div>
        <div>
          <p><span className="font-semibold">Style:</span> {inspectionData.styleCode}{inspectionData.styleDigit}</p>
          <p><span className="font-semibold">MO No:</span> {inspectionData.moNo}</p>
          <p><span className="font-semibold">Customer:</span> {inspectionData.customer}</p>
        </div>
      </div>
    </div>
  );
}

export default PreviewHeader;
