import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import useInput from '../hooks/useInput';
import { login } from '../utils/network-data';

function LoginPage({ loginSuccess }) {
  const [email, onEmailChangeHandler] = useInput('');
  const [password, onPasswordChangeHandler] = useInput('');

  const onSubmitLoginFormHandler = async (event) => {
    event.preventDefault();

    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  };

  return (
    <section className="login-page">
      <h2>Silahkan login untuk menggunakan aplikasi.</h2>

      <form className="input-login" onSubmit={onSubmitLoginFormHandler}>
        <label htmlFor="emailInput">
          Email
          <input type="text" id="emailInput" value={email} onChange={onEmailChangeHandler} />
        </label>
        <label htmlFor="passwordInput">
          Password
          <input type="password" id="passwordInput" value={password} onChange={onPasswordChangeHandler} />
        </label>
        <button type="submit">Login</button>
      </form>

      <p>
        Belum punya akun ?
        <Link to="/register">Daftar disini!</Link>
      </p>
    </section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
