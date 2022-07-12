import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { CoordsProvider } from 'contexts/coords-context';
import { appGsap } from 'lib/gsap';
import { setBackground } from './lib/mood';
import styles from './App.module.css';
import bgImg from 'assets/images/bgs/Background1-min.webp';

import Header from 'components/layout/Header';
import Main from 'components/layout/Main';
import Footer from 'components/layout/Footer';

function App() {
  const appEl = useRef();
  useLayoutEffect(() => {
    appGsap(appEl);
  }, [appEl]);

  const [moodCode, setMoodCode] = useState();
  const [bg, setBg] = useState(bgImg);

  useEffect(() => {
    if (moodCode) {
      setBg(setBackground(moodCode));
    }
  }, [moodCode]);

  return (
    <div ref={appEl}>
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className={styles['body-wrapper']}
      >
        <div className={styles['content-wrapper']}>
          <CoordsProvider>
            <Header />
            <Main moodCode={[moodCode, setMoodCode]} />
          </CoordsProvider>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
