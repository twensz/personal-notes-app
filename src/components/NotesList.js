import React from 'react';
import PropTypes from 'prop-types';

import NoteItem from './NoteItem';

function NotesList({ notes }) {
  return (
    <div className="notes-list">
      {notes.length > 0
        ? notes.map((note) => <NoteItem key={note.id} note={note} />)
        : <div className="notes-list-empty"><p>Catatan tidak ditemukan</p></div>}
    </div>
  );
}

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NotesList;
