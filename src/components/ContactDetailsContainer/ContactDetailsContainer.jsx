import { useSelector } from 'react-redux';
import { selectContactById } from '../../redux';
import css from 'pages/ContactDetails.module.css';

export const ContactDetailsContainer = () => {
  const contact = useSelector(selectContactById);
  return (
    <div>
      <h3>{contact.name}</h3>
      <div className={css.contact_info_container}>
        <img src={contact.avatar} alt="" />
        <div className={css.contact_info_textblock}>
          <div>
            <p>phone number:</p>
            <span>{contact.phone}</span>
          </div>
          <div>
            <p>email:</p>
            <span> {contact.email}</span>
          </div>
          <div>
            <p>address:</p>
            <span>{contact.address}</span>
          </div>
          <div>
            <p>date of birth:</p>
            <span>{contact.dateBD}</span>
          </div>
          <div>
            <p>notes:</p>
            <span>{contact.notes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
