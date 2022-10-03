import React from 'react';
import { getAllNotes } from '../utils/local-data';

import SearchBar from '../components/SearchBar';
import NotesList from '../components/NotesList';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getAllNotes(),
      keyword: '',
    };

    this.onKeywordChangeEventHandler = this.onKeywordChangeEventHandler.bind(this);
  }

  onKeywordChangeEventHandler(keyword) {
    this.setState({ keyword });
  }

  render() {
    const { notes, keyword } = this.state;

    return (
      <section>
        <h1>Catatan Aktif</h1>
        <SearchBar keyword={keyword} keywordChange={this.onKeywordChangeEventHandler} />
        <NotesList notes={notes} />
      </section>
    );
  }
}

export default HomePage;
