import { FC } from 'react';

import clsx from 'clsx';

import { Flex } from '../Flex';

export interface ModalBodyProps {
  className?: string;
}

export const ModalBody: FC<ModalBodyProps> = ({ className, children }) => {
  return <Flex className={clsx('w-full  p-md', className)}>{children}</Flex>;
};
