import { useInView } from 'react-intersection-observer';

const LazySection = ({ children }) => {
  // EARLY trigger (for data fetching)
  const { ref: preloadRef, inView: isNearView } = useInView({
    triggerOnce: true,
    rootMargin: '400px', // preload earlier
  });

  // ACTUAL render trigger
  const { ref: viewRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: '100px',
  });

  return (
    <div ref={preloadRef}>
      <div ref={viewRef}>{children({ inView, isNearView })}</div>
    </div>
  );
};

export default LazySection;
