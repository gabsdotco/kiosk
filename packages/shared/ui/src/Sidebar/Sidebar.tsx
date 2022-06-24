import { FC } from 'react';

import * as Icon from 'react-icons/fi';

import { Flex } from '../Flex';
import { Text } from '../Text';
import { Logo } from '../Logo';

export interface SidebarProps {
  userName?: string;
  userEmail?: string;
  onLogOut: () => void;
}

export const Sidebar: FC<SidebarProps> = ({
  children,
  userName,
  userEmail,
  onLogOut,
}) => {
  return (
    <Flex
      direction="column"
      className="sm:min-w-[280px] min-w-fit w-fit h-full gap-2xl pt-2xl bg-gray-900"
    >
      <Flex align="center" justify="center" className="hidden px-lg sm:flex">
        <Logo />
      </Flex>
      <Flex direction="column" className="w-full h-full gap-sm">
        {children}
      </Flex>
      <Flex
        align="center"
        justify="center"
        className="w-full border-t border-gray-800 sm:p-lg p-md gap-md"
      >
        <Icon.FiLogOut
          size="28px"
          strokeWidth="1.5px"
          className="text-gray-400 duration-150 cursor-pointer hover:text-gray-100"
          onClick={() => onLogOut()}
        />
        <Flex direction="column" className="hidden w-full sm:flex">
          <Text className="text-gray-200 ">{userName}</Text>
          <Text className="text-gray-400">{userEmail}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
