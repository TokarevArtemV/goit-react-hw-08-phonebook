import { LuUserSquare } from 'react-icons/lu';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import css from 'pages/Register/Register.module.css';
import { Button } from 'components';
import { useDispatch } from 'react-redux';
import { authRegisterUser } from '../../redux';

export const Register = () => {
  const dispatch = useDispatch();

  const handleSubmit = evt => {
    evt.preventDefault();
    const userData = Object.fromEntries(new FormData(evt.target));
    dispatch(authRegisterUser(userData));
  };

  return (
    <div className={css.form__container}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h2>Register</h2>

        <label className={css.form_label}>
          <LuUserSquare />
          <input
            className={css.form_input}
            type="text"
            name="name"
            placeholder="name"
            autoComplete="off"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={css.form_label}>
          <HiOutlineMail />

          <input
            className={css.form_input}
            type="email"
            name="email"
            placeholder="e-mail"
            autoComplete="off"
            title=""
            required
          />
        </label>
        <label className={css.form_label}>
          <RiLockPasswordLine />
          <input
            className={css.form_input}
            type="password"
            name="password"
            placeholder="password"
            minLength="8"
            autoComplete="off"
            title=""
            required
          />
        </label>
        <Button type={'submit'}>Sign Me Up</Button>
      </form>
    </div>
  );
};
