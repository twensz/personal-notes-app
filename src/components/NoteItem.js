import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import showFormattedDate from '../utils';

function NoteItem({ note }) {
  const {
    id,
    title,
    createdAt,
    body,
  } = note;

  return (
    <article className="note-item">
      <h3 className="note-item__title">
        <Link to={`/note/${id}`}>{title}</Link>
      </h3>
      <p className="note-item__createdAt">{showFormattedDate(createdAt)}</p>
      <p className="note-item__body">{body}</p>
    </article>
  );
}

NoteItem.propTypes = {
  note: PropTypes.object,
};

NoteItem.defaultProps = {
  note: {},
};

export default NoteItem;
