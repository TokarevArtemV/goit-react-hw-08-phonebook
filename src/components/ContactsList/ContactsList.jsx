import { useDispatch, useSelector } from 'react-redux';
import { apiDeleteContact, selectFilteredContacts } from '../../redux';
import { ContactItem } from 'components';

import css from 'components/ContactsList/ContactsList.module.css';
import { NotificationManager } from 'react-notifications';

export const ContactsList = () => {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <>
      <ul className={css.list}>
        {filteredContacts.map(contact => (
          <ContactItem
            key={contact.id}
            contact={contact}
            onClickDelBtn={() =>
              dispatch(apiDeleteContact(contact.id))
                .unwrap()
                .then(data =>
                  NotificationManager.success(
                    `${data.name} was successfully deleted`
                  )
                )
            }
          />
        ))}
      </ul>
    </>
  );
};
