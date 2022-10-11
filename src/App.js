import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AuthedUserContext from './contexts/AuthedUserContext';
import ThemeContext from './contexts/ThemeContext';
import LocaleContext from './contexts/LocaleContext';

import { getUserLogged, putAccessToken } from './utils/network-data';

import NotesHeader from './components/NotesHeader';
import AddNotePageWrapper from './pages/AddNotePage';
import ArchivedPageWrapper from './pages/ArchivedPage';
import DetailPageWrapper from './pages/DetailPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import PageNotFound from './pages/PageNotFound';

function App() {
  const [authedUser, setAuthedUser] = React.useState(null);
  const [theme, setTheme] = React.useState(() => localStorage.getItem('theme') || 'light');
  const [locale, setLocale] = React.useState(() => localStorage.getItem('locale') || 'id');
  const [initializing, setInitializing] = React.useState(true);

  React.useEffect(() => {
    async function initData() {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    }

    initData();

    return () => {
      setAuthedUser('');
      setInitializing('');
    };
  }, []);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  React.useEffect(() => localStorage.setItem('locale', locale), [locale]);

  const toggleLocale = () => setLocale((prevState) => (prevState === 'id' ? 'en' : 'id'));
  const toggleTheme = () => setTheme((prevState) => (prevState === 'light' ? 'dark' : 'light'));

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken('');
  };

  const authedUserContextValue = React.useMemo(() => (
    { authedUser, setAuthedUser, onLogout }
  ), [authedUser]);
  const themeContextValue = React.useMemo(() => ({ theme, toggleTheme }), [theme]);
  const localeContextValue = React.useMemo(() => ({ locale, toggleLocale }), [locale]);

  const render = () => {
    if (initializing) {
      return (
        <div className="loader-container">
          <div className="spinner" />
        </div>
      );
    }

    if (authedUser === null) {
      return (
        <AuthedUserContext.Provider value={authedUserContextValue}>
          <ThemeContext.Provider value={themeContextValue}>
            <LocaleContext.Provider value={localeContextValue}>
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
            </LocaleContext.Provider>
          </ThemeContext.Provider>
        </AuthedUserContext.Provider>
      );
    }

    return (
      <AuthedUserContext.Provider value={authedUserContextValue}>
        <ThemeContext.Provider value={themeContextValue}>
          <LocaleContext.Provider value={localeContextValue}>
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
          </LocaleContext.Provider>
        </ThemeContext.Provider>
      </AuthedUserContext.Provider>
    );
  };

  return render();
}

export default App;
