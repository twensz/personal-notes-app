import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getArchivedNotes } from '../utils/network-data';
import SearchBar from '../components/SearchBar';
import NotesList from '../components/NotesList';

function ArchivedPageWrapper() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const title = searchParams.get('title');

  function changeSearchParams(keyword) {
    setSearchParams({ title: keyword });
  }

  function navigateHome() {
    navigate('/note/new');
  }

  return (
    <ArchivedPage navigate={navigateHome} title={title} onSearch={changeSearchParams} />
  );
}

class ArchivedPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      keyword: props.title || '',
    };

    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
    this.onAddClickHandler = this.onAddClickHandler.bind(this);
  }

  async componentDidMount() {
    const { data } = await getArchivedNotes();
    this.setState({ notes: data });
  }

  onAddClickHandler(event) {
    event.preventDefault();
    const { navigate } = this.props;
    navigate();
  }

  onKeywordChangeHandler(keyword) {
    this.setState({ keyword });
    const { onSearch } = this.props;
    onSearch(keyword);
  }

  filteredNotes() {
    const { notes, keyword } = this.state;
    return notes.filter(
      (note) => note.title.toLowerCase().includes(keyword.toLowerCase()),
    );
  }

  render() {
    const { keyword } = this.state;

    return (
      <section>
        <h1>Catatan Arsip</h1>
        <SearchBar keyword={keyword} keywordChange={this.onKeywordChangeHandler} />
        <NotesList notes={this.filteredNotes()} />
      </section>
    );
  }
}

ArchivedPage.propTypes = {
  navigate: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  title: PropTypes.string,
};

ArchivedPage.defaultProps = {
  title: '',
};

export default ArchivedPageWrapper;
