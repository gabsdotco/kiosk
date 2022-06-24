import { FC } from 'react';

import { Text } from '../Text';

export const FormLabel: FC = ({ children }) => {
  return <Text className="text-gray-500">{children}</Text>;
};
