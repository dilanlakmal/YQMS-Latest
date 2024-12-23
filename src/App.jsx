import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import Details from './pages/Details';
import Inspection from './pages/Inspection';
import Return from './pages/Return';
import Profile from './pages/Profile';
import Logs from './pages/Logs';
import Navbar from './components/layout/Navbar';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [detailsSubmitted, setDetailsSubmitted] = useState(false);
  const [inspectionState, setInspectionState] = useState(null);
  const [returnState, setReturnState] = useState(null);
  const [logsState, setLogsState] = useState({
    details: null,
    logs: [],
    startTime: null,
    lastActionTime: null
  });
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [inspectionStartTime, setInspectionStartTime] = useState(null);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Update return state when inspection state changes
  useEffect(() => {
    if (inspectionState) {
      setReturnState(prev => ({
        ...prev,
        checkedQuantity: inspectionState.checkedQuantity,
        goodOutput: inspectionState.goodOutput,
        defectPieces: inspectionState.defectPieces
      }));
    }
  }, [inspectionState]);

  // Update inspection state when return state changes goodOutput
  useEffect(() => {
    if (returnState && returnState.goodOutput !== inspectionState?.goodOutput) {
      setInspectionState(prev => ({
        ...prev,
        goodOutput: returnState.goodOutput
      }));
    }
  }, [returnState?.goodOutput]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    resetAllStates();
  };

  const resetAllStates = () => {
    setInspectionState(null);
    setReturnState(null);
    setLogsState({
      details: null,
      logs: [],
      startTime: null,
      lastActionTime: null
    });
    setDetailsSubmitted(false);
    setTimer(0);
    setIsPlaying(false);
    setInspectionStartTime(null);
  };

  const handleDetailsSubmit = (details) => {
    const initialState = {
      inspectionData: details,
      defects: {},
      currentDefectCount: {},
      checkedQuantity: 0,
      goodOutput: 0,
      defectPieces: 0,
      language: 'english',
      view: 'list',
      hasDefectSelected: false
    };

    setInspectionState(initialState);
    setReturnState({
      ...initialState,
      returnDefects: {},
      returnDefectQty: 0
    });
    setLogsState(prev => ({
      ...prev,
      details
    }));
    setDetailsSubmitted(true);
  };

  const handleLogEntry = (entry) => {
    const currentTime = new Date().getTime();
    let inspectionTime;

    if (logsState.logs.length === 0) {
      // First entry - calculate time from inspection start
      inspectionTime = (currentTime - inspectionStartTime.getTime()) / 60000;
    } else {
      // Subsequent entries - calculate time from last action
      inspectionTime = (currentTime - logsState.lastActionTime) / 60000;
    }

    const newEntry = {
      ...entry,
      inspectionTime: inspectionTime.toFixed(2)
    };

    setLogsState(prev => ({
      ...prev,
      logs: [...prev.logs, newEntry],
      lastActionTime: currentTime
    }));
  };

  const handlePlayPause = () => {
    const currentTime = new Date();
    setIsPlaying(!isPlaying);
    
    if (!inspectionStartTime) {
      setInspectionStartTime(currentTime);
      setLogsState(prev => ({
        ...prev,
        startTime: currentTime.getTime()
      }));
    }
  };

  const handleSubmit = () => {
    resetAllStates();
  };

  const handleInspectionStateChange = (newState) => {
    setInspectionState(prev => ({
      ...prev,
      ...newState
    }));
  };

  const handleReturnStateChange = (newState) => {
    setReturnState(prev => ({
      ...prev,
      ...newState
    }));
    
    // Update goodOutput in inspection state if it changed in return state
    if (newState.goodOutput !== inspectionState?.goodOutput) {
      setInspectionState(prev => ({
        ...prev,
        goodOutput: newState.goodOutput
      }));
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {isAuthenticated && <Navbar onLogout={handleLogout} />}
        <div className={isAuthenticated ? 'pt-16' : ''}>
          <Routes>
            <Route 
              path="/" 
              element={
                isAuthenticated ? (
                  <Navigate to="/home" replace />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              } 
            />
            {isAuthenticated ? (
              <>
                <Route path="/home" element={<Home />} />
                <Route 
                  path="/details" 
                  element={
                    <Details 
                      onDetailsSubmit={handleDetailsSubmit}
                      isSubmitted={detailsSubmitted}
                      savedDetails={logsState.details}
                    />
                  } 
                />
                <Route 
                  path="/inspection" 
                  element={
                    detailsSubmitted ? (
                      <Inspection 
                        savedState={inspectionState}
                        onStateChange={handleInspectionStateChange}
                        onLogEntry={handleLogEntry}
                        onStartTime={(time) => setLogsState(prev => ({
                          ...prev,
                          startTime: time,
                          lastActionTime: time
                        }))}
                        onSubmit={handleSubmit}
                        timer={timer}
                        isPlaying={isPlaying}
                        onPlayPause={handlePlayPause}
                      />
                    ) : (
                      <Navigate to="/details" replace />
                    )
                  }
                />
                <Route 
                  path="/return" 
                  element={
                    detailsSubmitted ? (
                      <Return 
                        savedState={returnState}
                        onStateChange={handleReturnStateChange}
                        onLogEntry={handleLogEntry}
                        timer={timer}
                        isPlaying={isPlaying}
                        inspectionState={inspectionState}
                      />
                    ) : (
                      <Navigate to="/details" replace />
                    )
                  }
                />
                <Route 
                  path="/logs" 
                  element={
                    detailsSubmitted ? (
                      <Logs logsState={logsState} />
                    ) : (
                      <Navigate to="/details" replace />
                    )
                  } 
                />
                <Route path="/profile" element={<Profile />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/" replace />} />
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
