import { FC, useMemo } from 'react';

import clsx from 'clsx';

export interface HeadingProps {
  size?: 'xl' | '2xl' | '3xl' | '4xl';
  className?: string;
  weight?:
    | 'light'
    | 'normal'
    | 'medium'
    | 'semibold'
    | 'bold'
    | 'extrabold'
    | 'black';
}

export const Heading: FC<HeadingProps> = ({
  size = 'xl',
  weight = 'bold',
  className,
  children,
}) => {
  const getSizeStyle = useMemo(() => {
    const sizes = {
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
    };

    return sizes[size];
  }, [size]);

  const getWeightStyle = useMemo(() => {
    const weights = {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
      black: 'font-black',
    };

    return weights[weight];
  }, [weight]);

  return (
    <h1 className={clsx('font-sans', getSizeStyle, getWeightStyle, className)}>
      {children}
    </h1>
  );
};
