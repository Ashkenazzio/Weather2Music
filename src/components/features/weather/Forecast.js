import { useRef, useEffect } from 'react';
import { weatherInfoGsap } from 'lib/gsap';
import styles from './Forecast.module.css';

const Forecast = (props) => {
  const forecastEl = useRef();
  useEffect(() => {
    weatherInfoGsap(forecastEl);
  }, [forecastEl]);

  return (
    <div ref={forecastEl} className={styles['weather__forecast']}>
      <span
        id={styles['forecast-desc']}
        className='icon-before'
        data-icon={props.weather.icon}
      >
        {props.weather.forecast}
      </span>
    </div>
  );
};

export default Forecast;
