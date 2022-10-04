import React from 'react';
import PropTypes from 'prop-types';

import NoteItem from './NoteItem';

function NotesList({ notes }) {
  return (
    <div className="notes-list">
      {notes.map((note) => <NoteItem key={note.id} note={note} />)}
    </div>
  );
}

NotesList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object),
};

NotesList.defaultProps = {
  notes: [],
};

export default NotesList;
