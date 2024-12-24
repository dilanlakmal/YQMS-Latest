import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import Header from "../components/inspection/Header";
import ViewToggle from "../components/inspection/ViewToggle";
import DefectsList from "../components/inspection/DefectsList";
import Summary from "../components/inspection/Summary";
import PlayPauseButton from "../components/inspection/PlayPauseButton";
import PreviewModal from "../components/inspection/PreviewModal";
import { defectsList } from "../constants/defects";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faDownload } from "@fortawesome/free-solid-svg-icons";

function Inspection({
  savedState,
  onStateChange,
  onLogEntry,
  onStartTime,
  onSubmit,
  timer,
  isPlaying,
  onPlayPause,
}) {
  const navigate = useNavigate();
  const [view, setView] = useState(savedState?.view || "list");
  const [language, setLanguage] = useState(savedState?.language || "english");
  const [defects, setDefects] = useState(savedState?.defects || {});
  const [currentDefectCount, setCurrentDefectCount] = useState(
    savedState?.currentDefectCount || {}
  );
  const [checkedQuantity, setCheckedQuantity] = useState(
    savedState?.checkedQuantity || 0
  );
  const [goodOutput, setGoodOutput] = useState(savedState?.goodOutput || 0);
  const [defectPieces, setDefectPieces] = useState(
    savedState?.defectPieces || 0
  );
  const [hasDefectSelected, setHasDefectSelected] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (!savedState?.inspectionData) {
      navigate("/details");
    }
  }, [savedState, navigate]);

  useEffect(() => {
    onStateChange?.({
      ...savedState,
      defects,
      currentDefectCount,
      checkedQuantity,
      goodOutput,
      defectPieces,
      language,
      view,
      hasDefectSelected,
    });
  }, [
    defects,
    currentDefectCount,
    checkedQuantity,
    goodOutput,
    defectPieces,
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

  const handlePass = () => {
    if (!isPlaying || hasDefectSelected) return;

    const currentTime = new Date();
    setCheckedQuantity((prev) => prev + 1);
    setGoodOutput((prev) => prev + 1);

    onLogEntry?.({
      type: "pass",
      garmentNo: checkedQuantity + 1,
      status: "Pass",
      timestamp: currentTime.getTime(),
      defectDetails: [],
    });
  };

  const handleReject = () => {
    if (
      !isPlaying ||
      !Object.values(currentDefectCount).some((count) => count > 0)
    )
      return;

    const currentTime = new Date();
    setCheckedQuantity((prev) => prev + 1);
    setDefectPieces((prev) => prev + 1);

    Object.entries(currentDefectCount).forEach(([index, count]) => {
      if (count > 0) {
        setDefects((prev) => ({
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
        timestamp: currentTime.getTime(),
      }));

    onLogEntry?.({
      type: "reject",
      garmentNo: checkedQuantity + 1,
      status: "Reject",
      defectDetails: currentDefects,
      timestamp: currentTime.getTime(),
    });

    setCurrentDefectCount({});
  };

  const handleDownloadPDF = async () => {
    try {
      const element = document.createElement("div");
      element.innerHTML = `
        <h1 style="text-align: center; margin-bottom: 20px;">Inspection Report</h1>
        <div class="inspection-data">
          <h2>Inspection Details</h2>
          ${document.querySelector(".inspection-content")?.innerHTML || ""}
        </div>
        <div class="summary-data">
          <h2>Summary</h2>
          ${document.querySelector(".summary-content")?.innerHTML || ""}
        </div>
        <div class="logs-data">
          <h2>Inspection Logs</h2>
          ${document.querySelector(".logs-content")?.innerHTML || ""}
        </div>
      `;

      const opt = {
        margin: 1,
        filename: "inspection-report.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const handleSubmit = () => {
    onSubmit();
    navigate("/details");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="inspection-content">
        <div className="fixed top-16 left-0 right-0 bg-white z-40">
          <div className="max-w-7xl mx-auto px-4 pt-2 pb-0">
            <Header inspectionData={savedState?.inspectionData} />
          </div>
        </div>

        <div className="fixed top-28 left-0 right-0 bg-white shadow-md z-20">
          <div className="max-w-7xl mx-auto px-4 pt-2 pb-1 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <ViewToggle
                view={view}
                onViewChange={setView}
                onLanguageChange={setLanguage}
              />
              <PlayPauseButton
                isPlaying={isPlaying}
                onToggle={onPlayPause}
                timer={formatTime(timer)}
              />
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowPreview(true)}
                className="px-4 py-2 bg-indigo-700 text-white rounded hover:bg-indigo-400 flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faEye} size="lg" />
              </button>
              <button
                onClick={handleDownloadPDF}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faDownload} size="lg" />
              </button>

              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-14 pb-52">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-2 flex items-center justify-center">
              <button
                onClick={handlePass}
                disabled={!isPlaying || hasDefectSelected}
                className={`w-full h-full py-0 rounded font-medium ${
                  isPlaying && !hasDefectSelected
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                Pass
              </button>
            </div>
            <div className="col-span-8">
              <DefectsList
                view={view}
                language={language}
                defects={defects}
                currentDefectCount={currentDefectCount}
                onDefectUpdate={(index, value) => {
                  setDefects((prev) => ({ ...prev, [index]: value }));
                }}
                onCurrentDefectUpdate={(index, value) => {
                  setCurrentDefectCount((prev) => ({
                    ...prev,
                    [index]: value,
                  }));
                }}
                onLogEntry={onLogEntry}
                isPlaying={isPlaying}
                onDefectSelect={setHasDefectSelected}
              />
            </div>
            <div className="col-span-2 flex items-center justify-center">
              <button
                onClick={handleReject}
                disabled={
                  !isPlaying ||
                  !Object.values(currentDefectCount).some((count) => count > 0)
                }
                className={`w-full h-full py-0 rounded font-medium ${
                  isPlaying &&
                  Object.values(currentDefectCount).some((count) => count > 0)
                    ? "bg-red-500 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="summary-content">
            <Summary
              defects={defects}
              checkedQuantity={checkedQuantity}
              goodOutput={goodOutput}
              defectPieces={defectPieces}
            />
          </div>
        </div>
      </div>

      <PreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        inspectionData={savedState?.inspectionData}
        defects={defects}
        checkedQuantity={checkedQuantity}
        goodOutput={goodOutput}
        defectPieces={defectPieces}
        language={language}
      />
    </div>
  );
}

export default Inspection;
