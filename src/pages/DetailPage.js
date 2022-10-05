import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import {
  getNote, deleteNote, archiveNote, unarchiveNote,
} from '../utils/local-data';
import NoteDetail from '../components/NoteDetail';
import PageNotFound from './PageNotFound';

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
    this.onArchiveClickHandler = this.onArchiveClickHandler.bind(this);
    this.onUnarchiveClickHandler = this.onUnarchiveClickHandler.bind(this);
  }

  onArchiveClickHandler(id) {
    archiveNote(id);

    const { navigate } = this.props;
    navigate();
  }

  onUnarchiveClickHandler(id) {
    unarchiveNote(id);

    const { navigate } = this.props;
    navigate();
  }

  onDeleteClickHandler(id) {
    deleteNote(id);

    const { navigate } = this.props;
    navigate();
  }

  render() {
    const { note } = this.state;

    if (note === undefined) {
      return <PageNotFound />;
    }

    return (
      <NoteDetail
        note={note}
        deleteNote={this.onDeleteClickHandler}
        archiveNote={this.onArchiveClickHandler}
        unarchiveNote={this.onUnarchiveClickHandler}
      />
    );
  }
}

DetailPage.propTypes = {
  id: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default DetailPageWrapper;
