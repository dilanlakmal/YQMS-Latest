import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          QA/QC Inspection Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            onClick={() => navigate('/details')}
            className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Start New Inspection
            </h2>
            <p className="text-gray-600">
              Begin a new quality inspection process
            </p>
          </div>
          
          <div 
            onClick={() => navigate('/logs')}
            className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              View Logs
            </h2>
            <p className="text-gray-600">
              Check inspection history and reports
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
