import React, { CSSProperties, ReactNode } from 'react';
import useScrollObserver from '@/hook/useObserver/useScrollObserver';

type ScrollObserverFadeInProps = {
  children: ReactNode;
  style?: CSSProperties;
  time?: string;
  easeOpt?: 'ease' | 'ease-in-out' | 'ease-in' | 'ease-out';
  delay?: string;
  root?: null | Element;
  rootMargin: string;
  threshold: number | number[];
  isOnlyTop?: boolean;
};

const ScrollObserverFadeIn = ({
  children,
  style,
  time = '1s',
  easeOpt = 'ease',
  delay = '0s',
  root,
  rootMargin,
  threshold,
  isOnlyTop,
}: ScrollObserverFadeInProps) => {
  const { isInView, elementRef } = useScrollObserver({
    options: {
      root: root ? root : null,
      rootMargin: rootMargin ? rootMargin : '0px',
      threshold: threshold ? threshold : 0,
    },
    isOnlyTop: isOnlyTop,
  });

  return (
    <div
      ref={elementRef}
      style={{
        position: 'relative',
        opacity: isInView ? '1' : '0',
        transition: `${time} ${easeOpt}`,
        transitionDelay: delay,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
export default React.memo(ScrollObserverFadeIn);
