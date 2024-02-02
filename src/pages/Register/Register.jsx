import { LuUserSquare } from 'react-icons/lu';
import { useDispatch } from 'react-redux';
import { authRegisterUser } from '../../redux';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { NotificationManager } from 'react-notifications';
import { Formik } from 'formik';
import { Button } from 'components';
import * as Yup from 'yup';
import css from 'pages/Register/Register.module.css';

export const Register = () => {
  const dispatch = useDispatch();

  const handleSubmit = values => {
    dispatch(authRegisterUser(values))
      .unwrap()
      .catch(() =>
        NotificationManager.error(
          `Something went wrong, please check your registry data and try again`
        )
      );
  };

  return (
    <div className={css.form__container}>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .required('Name is required')
            .min(3, 'Name is too short - should be 3 chars minimum'),
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
              <h2>Register</h2>

              <label className={css.form_label}>
                <LuUserSquare />
                <input
                  className={css.form_input}
                  id="name"
                  type="text"
                  name="name"
                  placeholder="name"
                  autoComplete="off"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  title="Name should be 3 chars minimum"
                />
              </label>
              <label className={css.form_label}>
                <HiOutlineMail />

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
                Sign Me Up
              </Button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
