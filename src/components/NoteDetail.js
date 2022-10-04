import React from 'react';
import PropTypes from 'prop-types';

import showFormattedDate from '../utils';

function NoteDetail({ note }) {
  const {
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
    </div>
  );
}

NoteDetail.propTypes = {
  note: PropTypes.object.isRequired,
};

export default NoteDetail;
