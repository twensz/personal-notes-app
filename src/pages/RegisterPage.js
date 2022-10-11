import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { register } from '../utils/network-data';

function RegisterPage() {
  const navigate = useNavigate();

  const [name, onNameChangeHandler] = useInput('');
  const [email, onEmailChangeHandler] = useInput('');
  const [password, onPasswordChangeHandler] = useInput('');
  const [confirmPassword, onConfirmPasswordChangeHandler] = useInput('');

  const onSubmitRegisterFormHandler = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Konfirmasi Password tidak sesuai');
      return;
    }

    const data = {
      name, email, password,
    };
    const { error } = await register(data);

    if (!error) {
      navigate('/');
    }
  };

  return (
    <section className="register-page">
      <h2>Isi form untuk mendaftar akun.</h2>

      <form className="input-register" onSubmit={onSubmitRegisterFormHandler}>
        <label htmlFor="nameInput">
          Name
          <input type="text" id="nameInput" value={name} onChange={onNameChangeHandler} />
        </label>
        <label htmlFor="emailInput">
          Email
          <input type="text" id="emailInput" value={email} onChange={onEmailChangeHandler} />
        </label>
        <label htmlFor="passwordInput">
          Password
          <input type="password" id="passwordInput" value={password} onChange={onPasswordChangeHandler} />
        </label>
        <label htmlFor="confirmPasswordInput">
          Confirm Password
          <input type="password" id="confirmPasswordInput" value={confirmPassword} onChange={onConfirmPasswordChangeHandler} />
        </label>
        <button type="submit">Daftar</button>
      </form>

      <p>
        Sudah punya akun ?
        <Link to="/">Login disini!</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
