import { LuUserSquare } from 'react-icons/lu';
import { useDispatch } from 'react-redux';
import { RiLockPasswordLine } from 'react-icons/ri';
import { authLoginUser } from '../../redux';
import { Button } from 'components';
import css from 'pages/LogIn/Login.module.css';

// Artem23, tok23@gmail.com, 12345678

export const LogIn = () => {
  const dispatch = useDispatch();

  const handleSubmit = evt => {
    evt.preventDefault();
    const userData = Object.fromEntries(new FormData(evt.target));

    dispatch(authLoginUser(userData));
  };

  return (
    <div className={css.form__container}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h2>Log In</h2>

        <label className={css.form_label}>
          <LuUserSquare />
          <input
            className={css.form_input}
            type="text"
            name="email"
            placeholder="e-mail"
            autoComplete="email"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>

        <label className={css.form_label}>
          <RiLockPasswordLine />
          <input
            className={css.form_input}
            type="password"
            name="password"
            minLength="8"
            placeholder="password"
            autoComplete="current-password"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <Button type={'submit'}>Log in</Button>
      </form>
    </div>
  );
};
