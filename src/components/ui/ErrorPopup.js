import { useRef, useEffect } from 'react';
import { errorGsap } from 'lib/gsap';
import styles from './ErrorPopup.module.css';

const ErrorPopup = (props) => {
  const errorContainer = useRef();

  useEffect(() => {
    errorGsap(errorContainer);
  }, [errorContainer]);

  return (
    <div ref={errorContainer} className={styles.error}>
      {props.children}
    </div>
  );
};

export default ErrorPopup;
