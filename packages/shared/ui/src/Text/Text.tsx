import { FC, useMemo } from 'react';

import clsx from 'clsx';

export interface TextProps {
  size?: 'xs' | 'sm' | 'base' | 'md' | 'lg';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'black';
  className?: string;
}

export const Text: FC<TextProps> = ({
  size = 'base',
  weight = 'normal',
  className,
  children,
}) => {
  const getSizeStyle = useMemo(() => {
    const sizes = {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      md: 'text-md',
      lg: 'text-lg',
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
      black: 'font-black',
    };

    return weights[weight];
  }, [weight]);

  return (
    <span className={clsx(getSizeStyle, getWeightStyle, className)}>
      {children}
    </span>
  );
};
