import css from 'components/Button/Button.module.css';

export const Button = ({ type, children, onClick, isDisabled = false }) => {
  return (
    <button
      type={type}
      className={css.button}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};
