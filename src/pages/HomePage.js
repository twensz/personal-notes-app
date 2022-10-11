import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

import { getActiveNotes } from '../utils/network-data';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import NotesList from '../components/NotesList';
import LocaleContext from '../contexts/LocaleContext';

function HomePage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [notes, setNotes] = React.useState([]);
  const [keyword, setKeyword] = React.useState();
  const [initializing, setInitializing] = React.useState(true);

  React.useEffect(() => {
    const fetchNotes = async () => {
      const { data } = await getActiveNotes();
      setNotes(data);
    };

    fetchNotes();
    setKeyword(searchParams.get('keyword') || '');
    setInitializing(false);
  }, []);

  const onKeywordChangeHandler = (keywordInput) => {
    setKeyword(keywordInput);
    setSearchParams({ keyword: keywordInput });
  };

  const onAddClickHandler = () => navigate('/note/new');

  const filteredNotes = () => notes.filter(
    (note) => note.title.toLowerCase().includes(keyword.toLowerCase()),
  );

  const render = () => {
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
            <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
            <NotesList notes={filteredNotes()} />
            <div className="homepage__action">
              <Button type="button" title={locale === 'id' ? 'Tambah' : 'add'} onClick={onAddClickHandler}>
                <FiPlus />
              </Button>
            </div>
          </section>
        )}
      </LocaleContext.Consumer>
    );
  };

  return render();
}

export default HomePage;
