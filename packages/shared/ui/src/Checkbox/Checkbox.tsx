import { FC, useMemo } from 'react';

import clsx from 'clsx';

import { Flex } from '../Flex';
import { Text } from '../Text';

export interface CheckboxProps {
  value?: boolean;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  onChange?: (value: boolean) => void;
}

export const Checkbox: FC<CheckboxProps> = ({
  value,
  disabled,
  className,
  placeholder,
  children,
  onChange,
}) => {
  const getDisabledStyle = useMemo(() => {
    return disabled && 'opacity-80 bg-gray-50 cursor-not-allowed';
  }, [disabled]);

  return (
    <Flex align="center" className="gap-sm">
      <input
        id="checkbox"
        type="checkbox"
        checked={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={({ target }) => onChange && onChange(target.checked)}
        className={clsx(
          'w-4 h-4 text-primary-600 bg-white cursor-pointer border-gray-100 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600',
          getDisabledStyle,
          className
        )}
      />
      <label htmlFor="checkbox" className="cursor-pointer">
        <Text className="text-gray-500">{children}</Text>
      </label>
    </Flex>
  );
};
