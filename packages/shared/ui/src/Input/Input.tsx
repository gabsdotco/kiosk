import { FC, useMemo } from 'react';

import clsx from 'clsx';

export interface InputProps {
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'time';
  value?: string;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  onBlur?: (value: string) => void;
  onInput?: (value: string) => void;
  onChange?: (value: string) => void;
}

export const Input: FC<InputProps> = ({
  type = 'text',
  className,
  value,
  disabled,
  placeholder,
  onBlur,
  onInput,
  onChange,
}) => {
  const getDisabledStyle = useMemo(() => {
    return disabled && 'opacity-80 bg-gray-50 cursor-not-allowed';
  }, [disabled]);

  return (
    <input
      type={type}
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      onBlur={({ target }) => onBlur && onBlur(target.value)}
      onInput={({ currentTarget }) => onInput && onInput(currentTarget.value)}
      onChange={({ target }) => onChange && onChange(target.value)}
      className={clsx(
        'text-gray-500 outlin h-[42px] focus:outline-none focus:border-gray-200 text-base border focus:ring-0 border-gray-100 placeholder:text-gray-200 px-md py-sm',
        getDisabledStyle,
        className
      )}
    />
  );
};
