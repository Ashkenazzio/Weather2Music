import { useRef, useEffect } from 'react';
import { weatherInfoGsap } from 'lib/gsap';
import styles from './Temp.module.css';

const Temp = (props) => {
  const tempEl = useRef();
  useEffect(() => {
    weatherInfoGsap(tempEl);
  }, [tempEl]);

  return (
    <div ref={tempEl} className={styles['weather__temp']}>
      <span id='temp-num'>{props.weather.temp}&deg;c</span>
      <span id={styles['feels-like']}>
        feels like {props.weather.feels_like}&deg;c
      </span>
    </div>
  );
};

export default Temp;
