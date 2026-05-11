import { motion } from 'motion/react';
import { useEffect, useRef, useState, useMemo } from 'react';
const buildKeyframes = (from, steps) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);
  const keyframes = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])];
  });
  return keyframes;
};
const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = t => t,
  onAnimationComplete,
  stepDuration = 0.35
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);
  const defaultFrom = useMemo(
    () =>
      direction === 'top'
        ? { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,-50px,0)' }
        : { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,50px,0)' },
    [direction]
  );
  const defaultTo = useMemo(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.5,
        transform: direction === 'top' ? 'translate3d(0,5px,0)' : 'translate3d(0,-5px,0)'
      },
      { filter: 'blur(0px)', opacity: 1, transform: 'translate3d(0,0,0)' }
    ],
    [direction]
  );
  const fromSnapshot = animationFrom || defaultFrom;
  const toSnapshots = animationTo || defaultTo;
  const stepCount = toSnapshots.length; 
  const totalDuration = stepDuration * stepCount; 
  const times = Array.from({ length: stepCount + 1 }, (_, i) => i / stepCount); 
  const finalKeyframes = buildKeyframes(fromSnapshot, toSnapshots);
  return (
    <p ref={ref} className={`blur-text ${className} flex flex-wrap justify-center`}>
      {elements.map((segment, index) => {
        return (
          <motion.span
            className="inline-block will-change-[transform,filter,opacity]"
            key={index}
            initial={fromSnapshot}
            animate={inView ? finalKeyframes : fromSnapshot}
            transition={{
              duration: totalDuration,
              times: times,
              delay: (index * delay) / 1000,
              ease: easing
            }}
            onAnimationComplete={
              index === elements.length - 1 ? onAnimationComplete : undefined
            }
          >
            {segment === ' ' ? '\u00A0' : segment}
            {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </motion.span>
        );
      })}
    </p>
  );
};

export default BlurText;