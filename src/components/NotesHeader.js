import React from 'react';
import { Link } from 'react-router-dom';

import { BiExit } from 'react-icons/bi';
import Navigation from './Navigation';
import AuthedUserContext from '../contexts/AuthedUserContext';

function NotesHeader() {
  const { authedUser, onLogout } = React.useContext(AuthedUserContext);

  return (
    <header>
      <h1><Link to="/">Aplikasi Catatan</Link></h1>
      {authedUser
        ? (
          <>
            <Navigation />
            <button className="button-logout" onClick={onLogout}>
              <BiExit />
              {authedUser.name}
            </button>
          </>
        )
        : ''}

    </header>
  );
}

export default NotesHeader;
