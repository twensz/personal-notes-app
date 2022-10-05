import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FiPlus } from 'react-icons/fi';

import { getAllNotes } from '../utils/local-data';
import SearchBar from '../components/SearchBar';
import NotesList from '../components/NotesList';

function HomePageWrapper() {
  const navigate = useNavigate();

  function navigateHome() {
    navigate('/note/new');
  }

  return (
    <HomePage navigate={navigateHome} />
  );
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getAllNotes(),
      keyword: '',
    };

    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
    this.onAddClickHandler = this.onAddClickHandler.bind(this);
  }

  onKeywordChangeHandler(keyword) {
    this.setState({ keyword });
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
        <h1>Catatan Aktif</h1>
        <SearchBar keyword={keyword} keywordChange={this.onKeywordChangeHandler} />
        <NotesList notes={notes} />
        <div className="homepage__action">
          <button className="action" type="button" title="Tambah" onClick={this.onAddClickHandler}>
            <FiPlus />
          </button>
        </div>
      </section>
    );
  }
}

HomePage.propTypes = {
  navigate: PropTypes.func.isRequired,
};

export default HomePageWrapper;
