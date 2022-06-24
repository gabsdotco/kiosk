import { FC } from 'react';

import { Flex } from '../Flex';
import { Text } from '../Text';

export const TableEmptyState: FC = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="w-full h-full text-gray-500 border border-gray-100 border-dashed"
    >
      <Text size="md" weight="bold">
        Not found
      </Text>
      <Text className="text-gray-300">There&apos;s no registers found</Text>
    </Flex>
  );
};
