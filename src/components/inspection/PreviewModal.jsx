import { Dialog } from '@headlessui/react';
import PreviewHeader from './preview/PreviewHeader';
import PreviewDefects from './preview/PreviewDefects';
import PreviewSummary from './preview/PreviewSummary';

function PreviewModal({ 
  isOpen, 
  onClose, 
  inspectionData, 
  defects, 
  checkedQuantity, 
  goodOutput,
  defectPieces,
  language 
}) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-4xl bg-white rounded-lg shadow-xl max-h-[90vh] flex flex-col">
          <div className="p-6 flex-shrink-0">
            <Dialog.Title className="text-2xl font-bold mb-4">
              Inspection Report Preview
            </Dialog.Title>
            <PreviewHeader inspectionData={inspectionData} />
          </div>

          <div className="flex-1 overflow-auto px-6">
            <PreviewDefects 
              defects={defects} 
              language={language} 
              checkedQuantity={checkedQuantity}
            />
          </div>

          <div className="p-6 flex-shrink-0">
            <PreviewSummary 
              defects={defects} 
              checkedQuantity={checkedQuantity}
              goodOutput={goodOutput}
              defectPieces={defectPieces}
            />
            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default PreviewModal;
