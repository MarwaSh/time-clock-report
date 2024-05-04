import React from 'react';
import MonthlyReports from './components/MonthlyReports';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
       <h1>Monthly Reports</h1>
      <MonthlyReports />
    </div>
  );
}

export default App;
