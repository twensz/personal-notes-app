import React from 'react';
import { Routes, Route } from 'react-router-dom';

import NotesHeader from './components/NotesHeader';
import DetailPageWrapper from './pages/DetailPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="app-container">
      <NotesHeader />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/note/:id" element={<DetailPageWrapper />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
