import React from 'react';
import { Link } from 'react-router-dom';
import { BiExit } from 'react-icons/bi';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import Navigation from './Navigation';

import AuthedUserContext from '../contexts/AuthedUserContext';
import ThemeContext from '../contexts/ThemeContext';
import LocaleContext from '../contexts/LocaleContext';

function NotesHeader() {
  const { authedUser, onLogout } = React.useContext(AuthedUserContext);
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  const { locale, toggleLocale } = React.useContext(LocaleContext);

  return (
    <header>
      <h1><Link to="/">{locale === 'id' ? 'Aplikasi Catatan' : 'Notes App'}</Link></h1>
      {authedUser ? <Navigation /> : ''}
      <button className="toggle-locale" onClick={toggleLocale}>
        {locale === 'id' ? 'en' : 'id'}
      </button>
      <button className="toggle-theme" onClick={toggleTheme}>
        {theme === 'light' ? <BsFillMoonFill /> : <BsFillSunFill />}
      </button>
      {authedUser
        ? (
          <button className="button-logout" onClick={onLogout}>
            <BiExit />
            {authedUser.name}
          </button>
        ) : ''}

    </header>
  );
}

export default NotesHeader;
