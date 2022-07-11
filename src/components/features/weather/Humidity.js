import { useRef, useEffect } from 'react';
import { weatherInfoGsap } from 'lib/gsap';
import styles from './Humidity.module.css';

const Humidity = (props) => {
  const humidityEl = useRef();
  useEffect(() => {
    weatherInfoGsap(humidityEl);
  }, [humidityEl]);

  return (
    <div ref={humidityEl} className={styles['weather__humidity']}>
      <span>Humidity</span>
      <span id={styles['humid-num']} className='icon-before'>
        {props.weather.humidity}%
      </span>
    </div>
  );
};

export default Humidity;
