import React from 'react';
import { useParams } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import { getNote } from '../utils/local-data';
import NoteDetail from '../components/NoteDetail';

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
      // <h2 className="detail-page__title">{note.title}</h2>
      <NoteDetail note={note} />
    );
  }
}

DetailPage.propTypes = {
  id: PropTypes.string,
};

DetailPage.defaultProps = {
  id: null,
};

export default DetailPageWrapper;
