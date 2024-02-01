import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import { apiGetContacts, apiPostContact, selectContacts } from '../../redux';
import css from 'components/ContactForm/ContactForm.module.css';
import { Button } from 'components';

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

  const onSubmitForm = evt => {
    evt.preventDefault();
    const objUserData = Object.fromEntries(new FormData(inputForm.current));

    if (isExists(objUserData.name, contacts)) {
      NotificationManager.info(`${objUserData.name} is alredy in contacts`);
      return;
    }

    dispatch(apiPostContact(objUserData))
      .unwrap()
      .then(data =>
        NotificationManager.success(`${data.name} was successfully added`)
      );

    evt.target.reset();
  };

  return (
    <form ref={inputForm} className={css.form} onSubmit={onSubmitForm}>
      <label className={css.form_label}>
        <span className={css.text}>Name</span>
        <input
          className={css.form_input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={css.form_label}>
        <span className={css.text}>Telefone</span>
        <input
          className={css.form_input}
          type="tel"
          name="number"
          pattern="\d{3}[\-]\d{3}[\-]\d{4}"
          title="Number may contain only numbers and dushes. For example 050-111-2233"
          required
        />
      </label>

      <Button type="submit">Add contact</Button>
      {/* <button className={css.button} type="submit">
        Add contact
      </button> */}
    </form>
  );
};
