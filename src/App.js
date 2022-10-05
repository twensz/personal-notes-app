import React from 'react';
import { Routes, Route } from 'react-router-dom';

import NotesHeader from './components/NotesHeader';
import AddNotePageWrapper from './pages/AddNotePage';
import ArchivedPageWrapper from './pages/ArchivedPage';
import DetailPageWrapper from './pages/DetailPage';
import HomePage from './pages/HomePage';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <div className="app-container">
      <NotesHeader />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/archived" element={<ArchivedPageWrapper />} />
          <Route path="/note/:id" element={<DetailPageWrapper />} />
          <Route path="/note/new" element={<AddNotePageWrapper />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
