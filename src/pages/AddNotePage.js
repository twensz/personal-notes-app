import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { addNote } from '../utils/local-data';

function AddNotePageWrapper() {
  const navigate = useNavigate();

  function navigateHome() {
    navigate('/');
  }

  return (
    <AddNotePage navigate={navigateHome} />
  );
}

class AddNotePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
    };

    this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this);
    this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onTitleChangeHandler(event) {
    this.setState({ title: event.target.value });
  }

  onBodyChangeHandler(event) {
    this.setState({ body: event.target.value });
  }

  onSubmitHandler(event) {
    event.preventDefault();
    const { title, body } = this.state;
    const note = {
      title,
      body,
    };

    addNote(note);
    const { navigate } = this.props;
    navigate();
  }

  render() {
    const { title, body } = this.state;

    return (
      <form className="add-new-page__input" onSubmit={this.onSubmitHandler}>
        <input type="text" className="add-new-page__input__title" value={title} onChange={this.onTitleChangeHandler} placeholder="Judul catatan" />
        <textarea
          className="add-new-page__input__body"
          placeholder="Sebenarnya saya adalah ...."
          value={body}
          onChange={this.onBodyChangeHandler}
        />
        <div className="add-new-page__action">
          <button className="action" type="submit" title="Simpan">+</button>
        </div>
      </form>
    );
  }
}

AddNotePage.propTypes = {
  navigate: PropTypes.func.isRequired,
};

export default AddNotePageWrapper;
