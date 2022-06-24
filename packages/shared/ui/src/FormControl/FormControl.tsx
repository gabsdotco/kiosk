import { FC } from 'react';

import { Flex } from '../Flex';

export const FormControl: FC = ({ children }) => {
  return (
    <Flex direction="column" className="w-full gap-sm">
      {children}
    </Flex>
  );
};
