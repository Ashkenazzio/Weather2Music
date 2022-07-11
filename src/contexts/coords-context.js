import { createContext, useState } from 'react';

const CoordsContext = createContext();

export const CoordsProvider = ({ children }) => {
  const [coords, setCoords] = useState({
    lat: 0,
    lon: 0,
    getWeather: false,
  });

  return (
    <CoordsContext.Provider value={{ coords, setCoords }}>
      {children}
    </CoordsContext.Provider>
  );
};

export default CoordsContext;
