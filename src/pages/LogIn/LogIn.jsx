import { LuUserSquare } from 'react-icons/lu';
import { useDispatch } from 'react-redux';
import { RiLockPasswordLine } from 'react-icons/ri';
import { authLoginUser } from '../../redux';
import { NotificationManager } from 'react-notifications';
import { Formik } from 'formik';
import { Button } from 'components';
import * as Yup from 'yup';
import css from 'pages/LogIn/Login.module.css';

// Artem Tokarev, tok.artem@mail.com, 12345678

export const LogIn = () => {
  const dispatch = useDispatch();

  const handleSubmit = values => {
    dispatch(authLoginUser(values))
      .unwrap()
      .catch(() =>
        NotificationManager.error(
          `Something went wrong, please check your login data and try again`
        )
      );
  };

  return (
    <div className={css.form__container}>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required('Email is required'),

          password: Yup.string()
            .required('Password is required')
            .min(7, 'Password is too short - should be 7 chars minimum'),
        })}
      >
        {formik => {
          const {
            values,
            handleChange,
            handleSubmit,
            handleBlur,
            isValid,
            dirty,
          } = formik;
          return (
            <form className={css.form} onSubmit={handleSubmit}>
              <h2>Log in</h2>

              <label className={css.form_label}>
                <LuUserSquare />
                <input
                  className={css.form_input}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="e-mail"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  title="example@mail.com"
                />
              </label>

              <label className={css.form_label}>
                <RiLockPasswordLine />
                <input
                  className={css.form_input}
                  id="password"
                  type="password"
                  name="password"
                  placeholder="password"
                  autoComplete="current-password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  title="Password must be at least 7 characters"
                />
              </label>
              <Button type={'submit'} isDisabled={!(dirty && isValid)}>
                Log in
              </Button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
