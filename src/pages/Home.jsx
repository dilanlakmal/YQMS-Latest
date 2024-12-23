import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl font-extrabold text-blue-900 mb-12 text-left drop-shadow-md">
          Welcome to Quality Data Managment System
        </h3>

        <p className="text-lg text-gray-700 text-left mb-12">
          Click on the cards below to start inspection Reports.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            onClick={() => navigate("/details")}
            className="group bg-white p-8 rounded-xl shadow-lg cursor-pointer hover:shadow-2xl transition-transform transform hover:-translate-y-2 hover:scale-105"
          >
            <div className="flex items-center justify-center mb-6 bg-blue-100 w-16 h-16 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-blue-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10.5v3m18-3v3M5.25 19.5h13.5M4.5 3h15c.828 0 1.5.672 1.5 1.5v13.5c0 .828-.672 1.5-1.5 1.5h-15c-.828 0-1.5-.672-1.5-1.5V4.5c0-.828.672-1.5 1.5-1.5z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600">
              QC Inspection
            </h2>
            <p className="text-gray-600 group-hover:text-gray-800">
              Begin a new QC Endline Inspection Reports here.
            </p>
          </div>

          <div
            // onClick={() => navigate("/details")}
            className="group bg-white p-8 rounded-xl shadow-lg cursor-pointer hover:shadow-2xl transition-transform transform hover:-translate-y-2 hover:scale-105"
          >
            <div className="flex items-center justify-center mb-6 bg-green-100 w-16 h-16 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-green-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 3h9m-9 18h9M12 3v18M4.5 9h15m-15 6h15"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-green-600">
              QA Audit
            </h2>
            <p className="text-gray-600 group-hover:text-gray-800">
              Start a QA Audit Report here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
