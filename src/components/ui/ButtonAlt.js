import styles from './Button.module.css';

const ButtonAlt = (props) => {
  return (
    <div
      onClick={props.onClick}
      id={props.id}
      className={`${styles.btn} ${styles['btn--alt']}`}
    >
      {props.children}
    </div>
  );
};

export default ButtonAlt;
