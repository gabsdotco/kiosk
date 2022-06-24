import { FC, useMemo } from 'react';

import clsx from 'clsx';

export interface FlexProps {
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  direction?: 'row' | 'column';
  className?: string;
  onClick?: () => void;
}

export const Flex: FC<FlexProps> = ({
  className,
  align = 'start',
  justify = 'start',
  direction = 'row',
  onClick,
  children,
}) => {
  const getDirectionStyle = useMemo(() => {
    const directions = {
      row: 'flex-row',
      column: 'flex-col',
    };

    return directions[direction];
  }, [direction]);

  const getJustifyStyle = useMemo(() => {
    const justifies = {
      start: 'justify-start',
      end: 'justify-end',
      center: 'justify-center',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    };

    return justifies[justify];
  }, [justify]);

  const getAlignStyle = useMemo(() => {
    const aligns = {
      start: 'items-start',
      end: 'items-end',
      center: 'items-center',
      baseline: 'items-baseline',
      stretch: 'items-stretch',
    };

    return aligns[align];
  }, [align]);

  return (
    <div
      className={clsx(
        'flex',
        getDirectionStyle,
        getJustifyStyle,
        getAlignStyle,
        className
      )}
      onClick={() => onClick && onClick()}
    >
      {children}
    </div>
  );
};
