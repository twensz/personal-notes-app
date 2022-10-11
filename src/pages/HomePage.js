import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FiPlus } from 'react-icons/fi';

import { getActiveNotes } from '../utils/network-data';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import NotesList from '../components/NotesList';
import LocaleContext from '../contexts/LocaleContext';

function HomePageWrapper() {
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
    <HomePage navigate={navigateHome} title={title} onSearch={changeSearchParams} />
  );
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      keyword: props.title || '',
      initializing: true,
    };

    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
    this.onAddClickHandler = this.onAddClickHandler.bind(this);
  }

  async componentDidMount() {
    const { data } = await getActiveNotes();

    this.setState({ notes: data, initializing: false });
  }

  onKeywordChangeHandler(keyword) {
    this.setState({ keyword });
    const { onSearch } = this.props;
    onSearch(keyword);
  }

  onAddClickHandler(event) {
    event.preventDefault();
    const { navigate } = this.props;
    navigate();
  }

  filteredNotes() {
    const { notes, keyword } = this.state;
    return notes.filter(
      (note) => note.title.toLowerCase().includes(keyword.toLowerCase()),
    );
  }

  render() {
    const { initializing, keyword } = this.state;

    if (initializing) {
      return (
        <div className="loader-container">
          <div className="spinner" />
        </div>
      );
    }

    return (
      <LocaleContext.Consumer>
        {({ locale }) => (
          <section>
            <h1>{locale === 'id' ? 'Catatan Aktif' : 'Active Notes'}</h1>
            <SearchBar keyword={keyword} keywordChange={this.onKeywordChangeHandler} />
            <NotesList notes={this.filteredNotes()} />
            <div className="homepage__action">
              <Button type="button" title={locale === 'id' ? 'Tambah' : 'add'} onClick={this.onAddClickHandler}>
                <FiPlus />
              </Button>
            </div>
          </section>
        )}
      </LocaleContext.Consumer>
    );
  }
}

HomePage.propTypes = {
  navigate: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  title: PropTypes.string,
};

HomePage.defaultProps = {
  title: '',
};

export default HomePageWrapper;
