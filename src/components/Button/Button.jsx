import css from 'components/Button/Button.module.css';

export const Button = ({ type, children, onClick }) => {
  return (
    <button type={type} className={css.button} onClick={onClick}>
      {children}
    </button>
  );
};
