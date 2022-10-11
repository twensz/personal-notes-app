import React from 'react';
import PropTypes from 'prop-types';

import NoteItem from './NoteItem';
import LocaleContext from '../contexts/LocaleContext';

function NotesList({ notes }) {
  const { locale } = React.useContext(LocaleContext);

  return (
    <div className="notes-list">
      {notes.length > 0
        ? notes.map((note) => <NoteItem key={note.id} note={note} />)
        : <div className="notes-list-empty"><p>{locale === 'id' ? 'Catatan tidak ditemukan' : 'Note is unavailable'}</p></div>}
    </div>
  );
}

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NotesList;
