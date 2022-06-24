import { FC } from 'react';

import clsx from 'clsx';

import { Flex } from '../Flex';
import { Text } from '../Text';

export interface TablePaginationProps {
  pageIndex: number;
  pageCount: number;
  onGoToPage: (page: number) => void;
}

export const TablePagination: FC<TablePaginationProps> = ({
  pageIndex,
  pageCount,
  onGoToPage,
}) => {
  const getButtonStyle = (page: number) => {
    return page === pageIndex
      ? 'bg-gray-900 border-gray-900 text-white active:bg-gray-800'
      : 'hover:border-gray-100 border-transparent text-gray-900';
  };

  return (
    <Flex align="center" justify="between" className="w-full">
      <Flex className="gap-sm">
        {Array.from({ length: pageCount }).map((_, idx) => (
          <Flex
            key={idx}
            className={clsx(
              'border cursor-pointer px-md py-xs',
              getButtonStyle(idx)
            )}
            onClick={() => onGoToPage(idx)}
          >
            <Text size="sm">{idx + 1}</Text>
          </Flex>
        ))}
      </Flex>
      <Text className="hidden text-gray-200 sm:flex">10 items/page</Text>
    </Flex>
  );
};
