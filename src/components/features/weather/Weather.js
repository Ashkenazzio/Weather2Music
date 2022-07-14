import { useState, useContext, useRef, useEffect } from 'react';
import CoordsContext from 'contexts/coords-context';
import { getMoodCode } from 'lib/mood';
import { weatherGsap } from 'lib/gsap';

import styles from './Weather.module.css';
import Forecast from './Forecast';
import Temp from './Temp';
import Humidity from './Humidity';

const openWeatherApi = process.env.REACT_APP_OPEN_WEATHER_API;
const openWeatherKey = process.env.REACT_APP_OPEN_WEATHER_KEY;

const Weather = (props) => {
  const weatherEl = useRef();
  useEffect(() => {
    weatherGsap(weatherEl);
  }, [weatherEl]);

  const { coords, setCoords } = useContext(CoordsContext);

  const [weather, setWeather] = useState({
    forecast: '(--)',
    temp: 0,
    feels_like: 0,
    humidity: 0,
    icon: String.fromCharCode(`0xf534`),
  });

  const fetchWeather = async (coords) => {
    let units = 'metric';
    let url = `${openWeatherApi}lat=${coords.lat}&lon=${coords.lon}&appid=${openWeatherKey}&units=${units}`;

    if (coords.getWeather) {
      //fetch the weather
      try {
        const resp = await fetch(url);
        const data = await resp.json();
        const todaysWeather = data.list[0];
        isWeather(todaysWeather);
        setCoords({ lat: 0, lon: 0, getWeather: false });
      } catch (error) {
        console.log(error);
        alert('Something went wrong! Try again later');
      }
    }
    return;
  };

  const isWeather = (openWeather) => {
    const forecastIcon = openWeather.weather[0].icon;
    const temp = openWeather.main.temp.toFixed();

    const moodCode = getMoodCode(forecastIcon, temp);
    props.setMoodCode(moodCode);

    const forecastIconCase = {
      '01d': 'f185',
      '01n': 'f186',
      '02d': 'f6c4',
      '02n': 'f6c3',
      '03d': 'f0c2',
      '03n': 'f0c2',
      '04d': 'f0c2',
      '04n': 'f0c2',
      '09d': 'f740',
      '09n': 'f740',
      '10d': 'f743',
      '10n': 'f73c',
      '11d': 'f76c',
      '11n': 'f76c',
      '13d': 'f2dc',
      '13n': 'f2dc',
      '50d': 'f75f',
      '50n': 'f75f',
    };
    const iconId = forecastIconCase[forecastIcon];

    setWeather({
      forecast: openWeather.weather[0].main,
      temp: temp,
      feels_like: openWeather.main.feels_like.toFixed(),
      humidity: openWeather.main.humidity.toFixed(),
      icon: String.fromCharCode(`0x${iconId}`),
    });
  };
  fetchWeather(coords);

  return (
    <aside ref={weatherEl} className={`${styles.weather} glass`}>
      <Forecast weather={weather} />
      <Temp weather={weather} />
      <Humidity weather={weather} />
    </aside>
  );
};

export default Weather;
