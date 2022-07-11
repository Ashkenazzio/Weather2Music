import { useRef, useEffect } from 'react';
import styles from './Header.module.css';
import { headerGsap } from 'lib/gsap';

import Location from 'components/features/location/Location';
import Logo from 'components/ui/Logo';

const Header = () => {
  const headerEl = useRef();
  useEffect(() => {
    headerGsap(headerEl);
  }, [headerEl]);

  return (
    <header ref={headerEl} className={styles.header}>
      <Logo />
      <Location />
    </header>
  );
};

export default Header;
