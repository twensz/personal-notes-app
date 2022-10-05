import React from 'react';
import PropTypes from 'prop-types';
import { FiArchive, FiDelete } from 'react-icons/fi';

import showFormattedDate from '../utils';

function NoteDetail({ note, deleteNote }) {
  const {
    id,
    title,
    createdAt,
    body,
  } = note;

  return (
    <div className="detail-page">
      {note
        ? (
          <>
            <h2 className="detail-page__title">{title}</h2>
            <p className="detail-page__createdAt">{showFormattedDate(createdAt)}</p>
            <p className="detail-page__body">{body}</p>
          </>
        )
        : <h2 className="detail-page__not-found">Catatan tidak ditemukan</h2>}
      <div className="detail-page__action">
        <button className="action" type="button" title="Arsipkan">
          <FiArchive />
        </button>
        <button className="action" type="button" title="Hapus" onClick={() => deleteNote(id)}>
          <FiDelete />
        </button>
      </div>
    </div>
  );
}

NoteDetail.propTypes = {
  note: PropTypes.object.isRequired,
  deleteNote: PropTypes.func.isRequired,
};

export default NoteDetail;
