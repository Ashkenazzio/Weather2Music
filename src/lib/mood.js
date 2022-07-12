import bfImg from 'assets/images/bgs/Bright-Freezing-min.webp'
import bcImg from 'assets/images/bgs/Bright-Cold-min.webp'
import bmImg from 'assets/images/bgs/Bright-Mid-min.webp'
import bhImg from 'assets/images/bgs/Bright-Hot-min.webp'
import cfImg from 'assets/images/bgs/Cloudy-Freezing-min.webp'
import ccImg from 'assets/images/bgs/Cloudy-Cold-min.webp'
import cmImg from 'assets/images/bgs/Cloudy-Mid-min.webp'
import chImg from 'assets/images/bgs/Cloudy-Hot-min.webp'
import rcImg from 'assets/images/bgs/Rainy-Cold-min.webp'
import rmImg from 'assets/images/bgs/Rainy-Mid-min.webp'
import rhImg from 'assets/images/bgs/Rainy-Hot-min.webp'
import sfImg from 'assets/images/bgs/Snowy-Freezing-min.webp'

export const getMoodCode = (forecastIcon, temp) => {
  const prefix = getPrefix(forecastIcon);
  const infix = getInfix(forecastIcon);
  const suffix = getSuffix(temp);

  const moodCode = prefix + infix + suffix;

  setColors(prefix);
  setBackground(moodCode);

  return moodCode;
};

const getPrefix = (forecastIcon) => {
  let prefix;
  if (['01', '02'].some((i) => forecastIcon.includes(i))) {
    prefix = 'B';
  }

  if (['03', '04', '50'].some((i) => forecastIcon.includes(i))) {
    prefix = 'C';
  }

  if (['09', '10', '11'].some((i) => forecastIcon.includes(i))) {
    prefix = 'R';
  }

  if (forecastIcon.includes('13')) {
    prefix = 'S';
  }

  return prefix;
};

const getInfix = (forecastIcon) => {
  let infix;
  if (forecastIcon.includes('d')) {
    infix = 'd';
  }

  if (forecastIcon.includes('n')) {
    infix = 'n';
  }

  return infix;
};

const getSuffix = (temp) => {
  let suffix;

  if (temp <= 5) {
    suffix = 'F';
  }
  if (temp >= 6 && temp <= 15) {
    suffix = 'C';
  }
  if (temp >= 16 && temp <= 25) {
    suffix = 'M';
  }
  if (temp >= 26) {
    suffix = 'H';
  }

  return suffix;
};

export const setColors = (prefix) => {
  const root = document.documentElement;

  const primaryClrCase = {
    B: '#F1A83F',
    C: '#2F9275',
    R: '#413C5B',
    S: '#83414F',
  };

  const overlayCase = {
    B: 'linear-gradient(315deg, hsl(261, 18%, 56%) 0%, hsl(261, 22%, 65%) 100%)',
    C: 'linear-gradient(315deg, hsl(225, 20%, 47%) 0%, hsl(225, 30%, 67%) 100%)',
    R: 'linear-gradient(315deg, hsl(261, 18%, 56%) 0%, hsl(261, 22%, 65%) 100%)',
    S: 'linear-gradient(315deg, hsl(225, 20%, 47%) 0%, hsl(225, 30%, 67%) 100%)',
  };

  root.style.setProperty('--clr-primary', primaryClrCase[prefix]);
  root.style.setProperty('--bg-overlay', overlayCase[prefix]);
};

export const setBackground = (moodCode) => {
  const bgCase = {
    BnF: bfImg,
    BdF: bfImg,
    BdC: bcImg,
    BnC: bcImg,
    BdM: bmImg,
    BnM: bmImg,
    BdH: bhImg,
    BnH: bhImg,
    CdF: cfImg,
    CnF: cfImg,
    CdC: ccImg,
    CnC: ccImg,
    CdM: cmImg,
    CnM: cmImg,
    CdH: chImg,
    CnH: chImg,
    RdF: rcImg,
    RnF: rcImg,
    RdC: rcImg,
    RnC: rcImg,
    RdM: rmImg,
    RnM: rmImg,
    RdH: rhImg,
    RnH: rhImg,
    SdF: sfImg,
    SnF: sfImg,
    SdC: sfImg,
    SnC: sfImg,
    SdM: sfImg,
    SnM: sfImg,
    SdH: sfImg,
    SnH: sfImg,
  };

  return bgCase[moodCode];
};
