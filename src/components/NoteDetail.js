import React from 'react';
import PropTypes from 'prop-types';
import { FiDelete } from 'react-icons/fi';
import { MdArchive, MdUnarchive } from 'react-icons/md';

import showFormattedDate from '../utils';

function NoteDetail({
  note, deleteNote, archiveNote, unarchiveNote,
}) {
  const {
    id,
    title,
    createdAt,
    body,
    archived,
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
        {
          archived
            ? (
              <button className="action" type="button" title="Arsipkan" onClick={() => unarchiveNote(id)}>
                <MdUnarchive />
              </button>
            )
            : (
              <button className="action" type="button" title="Arsipkan" onClick={() => archiveNote(id)}>
                <MdArchive />
              </button>
            )
        }
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
  archiveNote: PropTypes.func.isRequired,
  unarchiveNote: PropTypes.func.isRequired,
};

export default NoteDetail;
