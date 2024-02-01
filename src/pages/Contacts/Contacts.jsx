import { useSelector } from 'react-redux';
import { selectContacts, selectError, selectStatus } from '../../redux';

import {
  ContactForm,
  Filter,
  Container,
  ContactsList,
  Loader,
} from 'components';

import css from 'components/App/App.module.css';

export const Contacts = () => {
  const contacts = useSelector(selectContacts);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  return (
    <>
      <Filter />
      <Container>
        <div className={css.inputContainer}>
          <h2>New contact</h2>
          <ContactForm />
        </div>
        <div className={css.contactsContainer}>
          <h2>Contacts</h2>
          {status === 'error' && <p>Error: {error}</p>}
          {status === 'pending' && <Loader />}
          {contacts.length > 0 && status === 'success' && <ContactsList />}
        </div>
      </Container>
    </>
  );
};
