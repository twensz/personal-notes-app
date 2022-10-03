import React from 'react';
import { PropTypes } from 'prop-types';

function SearchBar({ keyword, keywordChange }) {
  return (
    <div className="search-bar">
      <input value={keyword} onChange={(event) => keywordChange(event.target.value)} placeholder="Masukan judul catatan" />
    </div>
  );
}

SearchBar.propTypes = {
  keyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
};

SearchBar.defaultProps = {
  keyword: '',
};

export default SearchBar;
