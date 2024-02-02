import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import { apiGetContacts, apiPostContact, selectContacts } from '../../redux';
import { Formik } from 'formik';
import { Button } from 'components';
import * as Yup from 'yup';
import css from 'components/ContactForm/ContactForm.module.css';

function isExists(name, contacts) {
  return contacts.some(
    contact => contact.name.toLowerCase() === name.toLowerCase()
  );
}

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const inputForm = useRef();

  useEffect(() => {
    dispatch(apiGetContacts());
  }, [dispatch]);

  const handleSubmit = (value, action) => {
    if (isExists(value.name, contacts)) {
      NotificationManager.info(`${value.name} is alredy in contacts`);
      return;
    }

    dispatch(apiPostContact(value))
      .unwrap()
      .then(data =>
        NotificationManager.success(`${data.name} was successfully added`)
      );

    action.resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required('Name is required')
          .min(3, 'Name is too short - should be 3 chars minimum'),
        number: Yup.string()
          .required('Number is required')
          .min(1, 'Number is too short - should be 1 chars minimum'),
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
          <form ref={inputForm} className={css.form} onSubmit={handleSubmit}>
            <label className={css.form_label}>
              <span className={css.text}>Name</span>
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
              <span className={css.text}>Telefone</span>
              <input
                className={css.form_input}
                id="number"
                type="tel"
                name="number"
                placeholder="number"
                autoComplete="off"
                value={values.number}
                onChange={handleChange}
                onBlur={handleBlur}
                title="Number may contain only numbers and dushes. For example 050-111-2233"
              />
            </label>

            <Button type="submit" isDisabled={!(dirty && isValid)}>
              Add contact
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};
