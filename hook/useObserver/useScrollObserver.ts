import { useEffect, useRef, useState } from 'react';

const useScrollObserver = ({
  options = { root: null, rootMargin: '0px', threshold: 0 },
  isOnlyTop = true,
}: {
  options?: { root?: null | Element; rootMargin: string; threshold: number | number[] };
  isOnlyTop?: boolean;
}) => {
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      const { boundingClientRect, isIntersecting, rootBounds } = entry;
      if (rootBounds) {
        if (isOnlyTop) {
          // 스크롤이 아래로 갈 때만 작동
          isIntersecting || (!isIntersecting && boundingClientRect.top < rootBounds.top)
            ? setIsInView(true)
            : setIsInView(false);
        } else {
          setIsInView(isIntersecting);
        }
      }
    }, options);

    // 관찰설정
    observer.observe(elementRef.current);

    // 클린업
    return () => {
      observer.disconnect();
    };
  }, [options]);

  return { isInView, elementRef };
};

export default useScrollObserver;
