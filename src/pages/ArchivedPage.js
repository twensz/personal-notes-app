import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getArchivedNotes, searchArchivedNotes } from '../utils/local-data';
import SearchBar from '../components/SearchBar';
import NotesList from '../components/NotesList';

function ArchivedPageWrapper() {
  const navigate = useNavigate();

  function navigateHome() {
    navigate('/note/new');
  }

  return (
    <ArchivedPage navigate={navigateHome} />
  );
}

class ArchivedPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getArchivedNotes(),
      keyword: '',
    };

    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
    this.onAddClickHandler = this.onAddClickHandler.bind(this);
  }

  onKeywordChangeHandler(keyword) {
    this.setState({ keyword, notes: searchArchivedNotes(keyword) });
  }

  onAddClickHandler(event) {
    event.preventDefault();
    const { navigate } = this.props;
    navigate();
  }

  render() {
    const { notes, keyword } = this.state;

    return (
      <section>
        <h1>Catatan Arsip</h1>
        <SearchBar keyword={keyword} keywordChange={this.onKeywordChangeHandler} />
        <NotesList notes={notes} />
      </section>
    );
  }
}

ArchivedPage.propTypes = {
  navigate: PropTypes.func.isRequired,
};

export default ArchivedPageWrapper;
