import css from 'components/ContactItem/ContactItem.module.css';

export const ContactItem = ({
  contact: { name, number, avatar = 'https://i.ibb.co/2ShmK52/nobody.png' },
  onClickDelBtn,
}) => {
  return (
    <li className={css.item}>
      <img className={css.avatar} src={avatar} alt={name} />
      <span className={css.name}> {`${name}`}</span>
      <span className={css.phone}> {`☎ ${number}`}</span>
      <button className={css.button} type="button" onClick={onClickDelBtn}>
        ❌
      </button>
    </li>
  );
};
