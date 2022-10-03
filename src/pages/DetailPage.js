import React from 'react';
import { useParams } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import { getNote } from '../utils/local-data';
import showFormattedDate from '../utils';

function DetailPageWrapper() {
  const { id } = useParams();

  return (
    <DetailPage id={id} />
  );
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: getNote(props.id),
    };
  }

  render() {
    const { note } = this.state;

    return (
      <div className="detail-page">
        <h1 className="detail-page__title">{note.title}</h1>
        <p className="detail-page__createdAt">{showFormattedDate(note.createdAt)}</p>
        <p className="detail-page__body">{note.body}</p>
      </div>
    );
  }
}

DetailPage.propTypes = {
  id: PropTypes.number,
};

DetailPage.defaultProps = {
  id: null,
};

export default DetailPageWrapper;
