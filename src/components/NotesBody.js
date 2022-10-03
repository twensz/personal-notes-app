import React from 'react';

import SearchBar from './SearchBar';

class NotesBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: '',
    };
  }

  render() {
    const { keyword } = this.state;

    return (
      <main>
        <h1>Catatan Aktif</h1>
        <SearchBar keyword={keyword} />
      </main>
    );
  }
}

export default NotesBody;
