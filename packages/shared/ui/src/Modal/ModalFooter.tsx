import { FC } from 'react';

import clsx from 'clsx';

import { Flex } from '../Flex';

export interface ModalFooterProps {
  className?: string;
}

export const ModalFooter: FC<ModalFooterProps> = ({ children, className }) => {
  return (
    <Flex className={clsx('w-full border-t border-gray-100 p-md', className)}>
      {children}
    </Flex>
  );
};
