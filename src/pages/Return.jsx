import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/inspection/Header";
import ViewToggle from "../components/inspection/ViewToggle";
import DefectsList from "../components/inspection/DefectsList";
import Summary from "../components/inspection/Summary";
import { defectsList } from "../constants/defects";

function Return({
  savedState,
  onStateChange,
  onLogEntry,
  timer,
  isPlaying,
  inspectionState,
}) {
  const navigate = useNavigate();
  const [view, setView] = useState("list");
  const [language, setLanguage] = useState("english");
  const [returnDefects, setReturnDefects] = useState(
    savedState?.returnDefects || {}
  );
  const [currentDefectCount, setCurrentDefectCount] = useState({});
  const [checkedQuantity, setCheckedQuantity] = useState(
    inspectionState?.checkedQuantity || 0
  );
  const [goodOutput, setGoodOutput] = useState(
    inspectionState?.goodOutput || 0
  );
  const [defectPieces, setDefectPieces] = useState(
    inspectionState?.defectPieces || 0
  );
  const [returnDefectQty, setReturnDefectQty] = useState(
    savedState?.returnDefectQty || 0
  );
  const [hasDefectSelected, setHasDefectSelected] = useState(false);

  const isReturnComplete = goodOutput >= checkedQuantity;

  useEffect(() => {
    if (!savedState?.inspectionData) {
      navigate("/details");
    }
  }, [savedState, navigate]);

  // Keep in sync with inspection state
  useEffect(() => {
    if (inspectionState) {
      setCheckedQuantity(inspectionState.checkedQuantity);
      setGoodOutput(inspectionState.goodOutput);
      setDefectPieces(inspectionState.defectPieces);
    }
  }, [inspectionState]);

  useEffect(() => {
    onStateChange?.({
      ...savedState,
      returnDefects,
      currentDefectCount,
      goodOutput,
      returnDefectQty,
      language,
      view,
      hasDefectSelected,
    });
  }, [
    returnDefects,
    currentDefectCount,
    goodOutput,
    returnDefectQty,
    language,
    view,
    hasDefectSelected,
  ]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  const handlePassReturn = () => {
    if (!isPlaying || isReturnComplete || hasDefectSelected) return;
    setGoodOutput((prev) => Math.min(prev + 1, checkedQuantity));

    onLogEntry?.({
      type: "pass-return",
      status: "Pass Return",
      timestamp: new Date().getTime(),
      defectDetails: [],
    });

    setCurrentDefectCount({});
  };

  const handleRejectReturn = () => {
    if (
      !isPlaying ||
      isReturnComplete ||
      !Object.values(currentDefectCount).some((count) => count > 0)
    )
      return;

    const currentTime = new Date().getTime();
    const totalNewDefects = Object.values(currentDefectCount).reduce(
      (sum, count) => sum + count,
      0
    );
    setReturnDefectQty((prev) => prev + totalNewDefects);

    // Update return-specific defects
    Object.entries(currentDefectCount).forEach(([index, count]) => {
      if (count > 0) {
        setReturnDefects((prev) => ({
          ...prev,
          [index]: (prev[index] || 0) + count,
        }));
      }
    });

    const currentDefects = Object.entries(currentDefectCount)
      .filter(([_, count]) => count > 0)
      .map(([index, count]) => ({
        name: defectsList[language][index],
        count,
        timestamp: currentTime,
      }));

    onLogEntry?.({
      type: "reject-return",
      status: "Reject Return",
      defectDetails: currentDefects,
      timestamp: currentTime,
    });

    setCurrentDefectCount({});
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="fixed top-16 left-0 right-0 bg-white z-40">
        <div className="max-w-7xl mx-auto px-4 pt-2 pb-0">
          <Header inspectionData={savedState?.inspectionData} />
        </div>
      </div>

      <div className="fixed top-28 left-0 right-0 bg-white shadow-md z-30">
        <div className="max-w-7xl mx-auto px-4 pt-2 pb-1 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <ViewToggle
              view={view}
              onViewChange={setView}
              onLanguageChange={setLanguage}
            />
            <div className="text-xl font-mono">{formatTime(timer)}</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-14 pb-52">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-2 flex items-center justify-center">
            <button
              onClick={handlePassReturn}
              disabled={!isPlaying || isReturnComplete || hasDefectSelected}
              className={`w-full h-full py-0 rounded font-medium ${
                isPlaying && !isReturnComplete && !hasDefectSelected
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              Pass Return
            </button>
          </div>
          <div className="col-span-8">
            <DefectsList
              view={view}
              language={language}
              defects={returnDefects}
              currentDefectCount={currentDefectCount}
              onDefectUpdate={(index, value) => {
                setReturnDefects((prev) => ({ ...prev, [index]: value }));
              }}
              onCurrentDefectUpdate={(index, value) => {
                setCurrentDefectCount((prev) => ({ ...prev, [index]: value }));
              }}
              onLogEntry={onLogEntry}
              isPlaying={isPlaying && !isReturnComplete}
              onDefectSelect={setHasDefectSelected}
              isReturnView={true}
            />
          </div>
          <div className="col-span-2 flex items-center justify-center">
            <button
              onClick={handleRejectReturn}
              disabled={
                !isPlaying ||
                isReturnComplete ||
                !Object.values(currentDefectCount).some((count) => count > 0)
              }
              className={`w-full h-full py-0 rounded font-medium ${
                isPlaying &&
                !isReturnComplete &&
                Object.values(currentDefectCount).some((count) => count > 0)
                  ? "bg-red-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              Reject Return
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Summary
            defects={inspectionState?.defects || {}}
            checkedQuantity={checkedQuantity}
            goodOutput={goodOutput}
            defectPieces={defectPieces}
            returnDefectQty={returnDefectQty}
          />
        </div>
      </div>
    </div>
  );
}

export default Return;
