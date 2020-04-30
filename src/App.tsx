import React from 'react';
import Routes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { TopBar } from './components/topBar';

function App() {
  return (
    <div>
      <Router>
        <TopBar />
        <Routes />
      </Router>
    </div>
  );
}

export default App;
