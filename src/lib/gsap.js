import { gsap } from 'gsap';

export const appGsap = (ref) => {
  gsap.from(ref.current, {
    duration: 2,
    opacity: 0,
    ease: 'power3.out',
  });
};

export const headerGsap = (ref) => {
  gsap.from(ref.current, {
    delay: 1.5,
    duration: 1,
    opacity: 0,
    ease: 'power3.out',
  });
};

export const weatherGsap = (ref) => {
  gsap.from(ref.current, {
    delay: 1,
    duration: 0.4,
    opacity: 0,
    y: 20,
    ease: 'power3.easeOut',
  });
};

export const weatherInfoGsap = (ref) => {
  gsap.from(ref.current, {
    duration: 0.4,
    opacity: 0,
    y: 20,
    ease: 'power3.easeOut',
    stagger: 0.2,
  });
};

export const videoGsap = (ref) => {
  gsap.from(ref.current, {
    delay: 1,
    duration: 0.8,
    opacity: 0,
    y: -20,
    ease: 'power3.easeOut',
  });
};

export const songGsap = (ref) => {
  gsap.from(ref.current, {
    delay: 1.5,
    duration: 3,
    opacity: 0,
    ease: 'power3.out',
  });
};

export const playlistGsap = (ref) => {
  gsap.from(ref.current, {
    delay: 1,
    duration: 0.4,
    opacity: 0,
    y: 20,
    ease: 'power3.easeOut',
  });
};

export const listGsap = (ref) => {
  gsap.from(ref.current.childNodes, {
    duration: 0.4,
    opacity: 0,
    y: 20,
    ease: 'power3.easeOut',
    stagger: 0.2,
  });
};
