import React from 'react';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';
import { FiDelete } from 'react-icons/fi';
import { MdArchive, MdUnarchive } from 'react-icons/md';

import Button from './Button';
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
            <div className="detail-page__body">{parser(body || 'initializing')}</div>
          </>
        )
        : <h2 className="detail-page__not-found">Catatan tidak ditemukan</h2>}
      <div className="detail-page__action">
        {
          archived
            ? (
              <Button className="action" type="button" title="Keluarkan" onClick={() => unarchiveNote(id)}>
                <MdUnarchive />
              </Button>
            )
            : (
              <Button className="action" type="button" title="Arsipkan" onClick={() => archiveNote(id)}>
                <MdArchive />
              </Button>
            )
        }
        <Button className="action" type="button" title="Hapus" onClick={() => deleteNote(id)}>
          <FiDelete />
        </Button>
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
