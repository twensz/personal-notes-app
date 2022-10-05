import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import { getNote, deleteNote } from '../utils/local-data';
import NoteDetail from '../components/NoteDetail';

function DetailPageWrapper() {
  const navigate = useNavigate();
  const { id } = useParams();

  function navigateHome() {
    navigate('/');
  }

  return (
    <DetailPage id={id} navigate={navigateHome} />
  );
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: getNote(props.id),
    };

    this.onDeleteClickHandler = this.onDeleteClickHandler.bind(this);
  }

  onDeleteClickHandler(id) {
    deleteNote(id);

    const { navigate } = this.props;
    navigate();
  }

  render() {
    const { note } = this.state;

    return (
      <NoteDetail note={note} deleteNote={this.onDeleteClickHandler} />
    );
  }
}

DetailPage.propTypes = {
  id: PropTypes.string,
  navigate: PropTypes.func.isRequired,
};

DetailPage.defaultProps = {
  id: null,
};

export default DetailPageWrapper;
