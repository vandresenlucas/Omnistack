import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './Components/Header';
import Routes from './routes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
