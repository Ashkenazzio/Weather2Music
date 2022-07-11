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
    BnF: require('assets/images/bgs/Bright-Freezing.jpg').default,
    BdF: require('assets/images/bgs/Bright-Freezing.jpg').default,
    BdC: require('assets/images/bgs/Bright-Cold.jpg').default,
    BnC: require('assets/images/bgs/Bright-Cold.jpg').default,
    BdM: require('assets/images/bgs/Bright-Mid.jpg').default,
    BnM: require('assets/images/bgs/Bright-Mid.jpg').default,
    BdH: require('assets/images/bgs/Bright-Hot.jpg').default,
    BnH: require('assets/images/bgs/Bright-Hot.jpg').default,
    CdF: require('assets/images/bgs/Cloudy-Freezing.jpg').default,
    CnF: require('assets/images/bgs/Cloudy-Freezing.jpg').default,
    CdC: require('assets/images/bgs/Cloudy-Cold.jpg').default,
    CnC: require('assets/images/bgs/Cloudy-Cold.jpg').default,
    CdM: require('assets/images/bgs/Cloudy-Mid.jpg').default,
    CnM: require('assets/images/bgs/Cloudy-Mid.jpg').default,
    CdH: require('assets/images/bgs/Cloudy-Hot.jpg').default,
    CnH: require('assets/images/bgs/Cloudy-Hot.jpg').default,
    RdF: require('assets/images/bgs/Rainy-Cold.jpg').default,
    RnF: require('assets/images/bgs/Rainy-Cold.jpg').default,
    RdC: require('assets/images/bgs/Rainy-Cold.jpg').default,
    RnC: require('assets/images/bgs/Rainy-Cold.jpg').default,
    RdM: require('assets/images/bgs/Rainy-Mid.jpg').default,
    RnM: require('assets/images/bgs/Rainy-Mid.jpg').default,
    RdH: require('assets/images/bgs/Rainy-Hot.jpg').default,
    RnH: require('assets/images/bgs/Rainy-Hot.jpg').default,
    SdF: require('assets/images/bgs/Snowy-Freezing.jpg').default,
    SnF: require('assets/images/bgs/Snowy-Freezing.jpg').default,
    SdC: require('assets/images/bgs/Snowy-Freezing.jpg').default,
    SnC: require('assets/images/bgs/Snowy-Freezing.jpg').default,
    SdM: require('assets/images/bgs/Snowy-Freezing.jpg').default,
    SnM: require('assets/images/bgs/Snowy-Freezing.jpg').default,
    SdH: require('assets/images/bgs/Snowy-Freezing.jpg').default,
    SnH: require('assets/images/bgs/Snowy-Freezing.jpg').default,
  };

  return bgCase[moodCode];
};
