import { FC } from 'react';

import clsx from 'clsx';

import { Flex } from '../Flex';

export interface ModalProps {
  isOpen: boolean;
}

export const Modal: FC<ModalProps> = ({ children, isOpen }) => {
  return (
    <>
      {isOpen ? (
        <Flex
          align="center"
          justify="center"
          className={clsx('absolute w-full h-full left-0 top-0 z-20 p-md')}
        >
          <Flex className="absolute top-0 left-0 z-30 w-full h-full bg-gray-800 opacity-30" />
          <Flex
            direction="column"
            className="min-w-[100px] w-full sm:max-w-[500px] max-w-full bg-white z-40"
          >
            {children}
          </Flex>
        </Flex>
      ) : (
        <></>
      )}
    </>
  );
};
