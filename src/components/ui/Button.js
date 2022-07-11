import styles from './Button.module.css';

const Button = (props) => {
  return (
    <div
      id={props.id}
      className={`${styles.btn} icon-before`}
      data-icon={props.icon}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export default Button;
