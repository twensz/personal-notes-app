import React from 'react';
import { Routes, Route } from 'react-router-dom';

import NotesHeader from './components/NotesHeader';
import AddNotePageWrapper from './pages/AddNotePage';
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
          <Route path="/note/new" element={<AddNotePageWrapper />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
