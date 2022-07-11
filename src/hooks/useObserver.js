import { useEffect } from 'react';

const useObserver = (ref) => {
  useEffect(() => {
    const root = document.documentElement;
    const target = ref.current;
    const resizeObserver = new ResizeObserver((element) =>
      root.style.setProperty('--vid-container-h', `${target.clientHeight}px`)
    );
    resizeObserver.observe(target);
    return () => {
      resizeObserver.unobserve(target);
    };
  }, [ref]);
};

export default useObserver;
