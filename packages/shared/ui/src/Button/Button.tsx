import { FC, useMemo } from 'react';

import clsx from 'clsx';

import { Text } from '../Text';

export interface ButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({
  className,
  variant = 'primary',
  disabled,
  onClick,
  children,
}) => {
  const getVariantStyle = useMemo(() => {
    const variants = {
      primary: 'bg-gray-900 border border-black text-white active:bg-gray-800',
      danger:
        'bg-red-700 border border-red-700 text-white active:bg-red-800 active:border-red-800',
      secondary:
        'border border-gray-100 bg-white text-gray-500 active:bg-gray-100',
    };

    return variants[variant];
  }, [variant]);

  const getDisabledStyle = useMemo(() => {
    return disabled && 'opacity-50 cursor-not-allowed';
  }, [disabled]);

  return (
    <button
      disabled={disabled}
      className={clsx(
        'px-lg py-sm duration-150 text-base font-normal min-w-[100px]',
        getVariantStyle,
        getDisabledStyle,
        className
      )}
      onClick={() => onClick && onClick()}
    >
      <Text>{children}</Text>
    </button>
  );
};
