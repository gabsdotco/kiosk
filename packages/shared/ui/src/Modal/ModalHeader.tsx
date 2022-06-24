import { FC } from 'react';

import * as Icon from 'react-icons/fi';
import clsx from 'clsx';

import { Flex } from '../Flex';
import { Text } from '../Text';

export interface ModalHeaderProps {
  className?: string;
  onClose: () => void;
}

export const ModalHeader: FC<ModalHeaderProps> = ({
  className,
  children,
  onClose,
}) => {
  return (
    <Flex
      align="center"
      justify="between"
      className={clsx('w-full border-b border-gray-100 p-md', className)}
    >
      <Text size="md" className="text-gray-700">
        {children}
      </Text>
      <Flex
        align="center"
        justify="center"
        className="cursor-pointer p-sm hover:bg-gray-100"
        onClick={() => onClose()}
      >
        <Icon.FiX />
      </Flex>
    </Flex>
  );
};
