import React, { useState, useEffect, useRef, useContext } from 'react';
import CoordsContext from 'contexts/coords-context';
import styles from './Location.module.css';

import ErrorPopup from 'components/ui/ErrorPopup';
import Button from 'components/ui/Button';
import ButtonAlt from 'components/ui/ButtonAlt';
import Input from 'components/ui/Input';
import Cta from 'components/ui/Cta';

const mapApiJs = process.env.REACT_APP_GMAP_API;
const geocodeJson = process.env.REACT_APP_GEOCODE_JSON;
const gcpKey = process.env.REACT_APP_GCP_API_KEY;

// load google map api js
function loadAsyncScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    Object.assign(script, {
      type: 'text/javascript',
      async: true,
      src,
    });
    script.addEventListener('load', () => resolve(script));
    document.head.appendChild(script);
  });
}

const Location = () => {
  const searchInput = useRef(null);
  const [placeIsValid, setPlaceIsValid] = useState(true);
  const { coords, setCoords } = useContext(CoordsContext);

  // load map script after mounted
  useEffect(() => {
    initMapScript().then(() => initAutocomplete());
  });

  // init google maps script
  const initMapScript = () => {
    // if script already loaded
    if (window.google) {
      return Promise.resolve();
    }
    const src = `${mapApiJs}?key=${gcpKey}&libraries=places&v=weekly`;
    return loadAsyncScript(src);
  };

  // init autocomplete
  const initAutocomplete = () => {
    if (!searchInput.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      searchInput.current,
      {
        types: ['(cities)'],
        fields: ['place_id', 'geometry', 'name'],
      }
    );
    autocomplete.addListener('place_changed', () =>
      onPlaceChanged(autocomplete)
    );
  };

  // do something on place change
  const onPlaceChanged = (autocomplete) => {
    const place = autocomplete.getPlace();
    setCoords({
      ...coords,
      lat: place.geometry.location.lat(),
      lon: place.geometry.location.lng(),
    });
    setPlaceIsValid(true);
  };

  // find position and assign coordinates
  const findMyLocation = () => {
    searchInput.current.value = 'Getting your location...';
    if (navigator.geolocation) {
      let opts = {
        enableHighAccuracy: true,
        timeout: 1000 * 10, //10 seconds
        maximumAge: 1000 * 60 * 5, //5 minutes
      };

      const ftw = (position) => {
        setCoords({
          ...coords,
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        reverseGeocode(position.coords);
      };

      const wtf = (error) => {
        console.log(error);
        searchInput.current.value = '';
        if (error.code === 1) {
          alert('Please enable location services and try again');
          return;
        }

        alert('Something went wrong! Try again later');
      };

      navigator.geolocation.getCurrentPosition(ftw, wtf, opts);
    }

    // take auto-position and display location name
    const reverseGeocode = async ({ latitude: lat, longitude: lon }) => {
      const url = `${geocodeJson}?key=${gcpKey}&latlng=${lat},${lon}`;
      try {
        const res = await fetch(url);
        const location = await res.json();
        const place = location.results[0].address_components;
        searchInput.current.value =
          place[2].long_name + ', ' + place[4].long_name;

        setPlaceIsValid(true);
      } catch (error) {
        console.log(error);
        searchInput.current.value = '';
        alert('Something went wrong! Try again later');
      }
    };
  };

  // adds key to call weather fetching
  const getWeather = () => {
    if (coords.lat === 0 && coords.lon === 0) {
      setPlaceIsValid(false);
      return;
    }
    setPlaceIsValid(true);
    setCoords({ ...coords, getWeather: true });
  };

  return (
    <div className={styles.location}>
      <Cta />
      <div className={styles.wrapper}>
        {!placeIsValid && (
          <ErrorPopup>Please make sure you enter a valid place</ErrorPopup>
        )}
        <Input
          className={styles['location__input']}
          ref={searchInput}
          type='text'
        />
        <div className={`${styles['main-btn']} glass`}>
          <Button onClick={getWeather} id={styles['get-weather']}>
            Get
          </Button>
        </div>
        <ButtonAlt onClick={findMyLocation} id={styles['auto-loc']}>
          Use Current Location
        </ButtonAlt>
      </div>
    </div>
  );
};

export default Location;
