import { useInView } from 'react-intersection-observer';

const LazySection = ({ children }) => {
  const { ref: preloadRef, inView: isNearView } = useInView({
    triggerOnce: true,
    rootMargin: '400px',
  });

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
