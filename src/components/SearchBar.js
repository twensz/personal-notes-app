import React from 'react';
import { PropTypes } from 'prop-types';
import LocaleContext from '../contexts/LocaleContext';

function SearchBar({ keyword, keywordChange }) {
  const { locale } = React.useContext(LocaleContext);

  return (
    <div className="search-bar">
      <input value={keyword} onChange={(event) => keywordChange(event.target.value)} placeholder={locale === 'id' ? 'Cari berdasarkan judul ...' : 'Search by title ...'} />
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
