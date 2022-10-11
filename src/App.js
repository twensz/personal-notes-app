import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AuthedUserContext from './contexts/AuthedUserContext';

import NotesHeader from './components/NotesHeader';
import AddNotePageWrapper from './pages/AddNotePage';
import ArchivedPageWrapper from './pages/ArchivedPage';
import DetailPageWrapper from './pages/DetailPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import PageNotFound from './pages/PageNotFound';
import { getUserLogged, putAccessToken } from './utils/network-data';

function App() {
  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);

  React.useEffect(() => {
    async function initData() {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    }

    initData();
  }, []);

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken('');
  };

  const contextValue = React.useMemo(() => ({ authedUser, setAuthedUser, onLogout }), [authedUser]);

  const render = () => {
    if (initializing) {
      return (
        <div className="app-container">
          <NotesHeader />
          <main>
            <h2>Initializing ...</h2>
          </main>
        </div>
      );
    }

    if (authedUser === null) {
      return (
        <AuthedUserContext.Provider value={contextValue}>
          <div className="app-container">
            <NotesHeader />
            <main>
              <Routes>
                <Route path="/" element={<LoginPage loginSuccess={onLoginSuccess} />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </main>
          </div>
        </AuthedUserContext.Provider>
      );
    }

    return (
      <AuthedUserContext.Provider value={contextValue}>
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
      </AuthedUserContext.Provider>
    );
  };

  return render();
}

export default App;
