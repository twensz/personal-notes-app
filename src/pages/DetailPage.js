import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import {
  getNote, deleteNote, archiveNote, unarchiveNote,
} from '../utils/network-data';
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
      note: {},
      initializing: true,
    };

    this.onDeleteClickHandler = this.onDeleteClickHandler.bind(this);
    this.onArchiveClickHandler = this.onArchiveClickHandler.bind(this);
    this.onUnarchiveClickHandler = this.onUnarchiveClickHandler.bind(this);
  }

  async componentDidMount() {
    const { id } = this.props;
    const { data } = await getNote(id);
    this.setState({ note: data, initializing: false });
  }

  async onArchiveClickHandler(id) {
    await archiveNote(id);

    const { navigate } = this.props;
    navigate();
  }

  async onUnarchiveClickHandler(id) {
    await unarchiveNote(id);

    const { navigate } = this.props;
    navigate();
  }

  async onDeleteClickHandler(id) {
    await deleteNote(id);

    const { navigate } = this.props;
    navigate();
  }

  render() {
    const { note, initializing } = this.state;

    if (note === undefined) {
      return <PageNotFound />;
    }

    if (initializing) {
      return (
        <h2>Initializing ...</h2>
      );
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
