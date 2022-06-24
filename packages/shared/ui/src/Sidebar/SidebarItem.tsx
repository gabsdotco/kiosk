import { FC, useMemo } from 'react';

import clsx from 'clsx';
import * as Icon from 'react-icons/fi';

import { useRouter } from 'next/router';

import { Flex } from '../Flex';
import { Text } from '../Text';

interface SidebarItemProps {
  icon: keyof typeof Icon;
  route: string;
}

export const SidebarItem: FC<SidebarItemProps> = ({
  icon,
  route,
  children,
}) => {
  const router = useRouter();

  const getItemIcon = useMemo(() => {
    const ItemIcon = Icon[icon];

    return <ItemIcon strokeWidth="1.5px" size="24px" />;
  }, [icon]);

  const isSelected = useMemo(() => {
    return router.pathname.includes(route);
  }, [router.pathname, route]);

  const getSelectedStyle = useMemo(() => {
    return isSelected
      ? 'text-white border-white'
      : 'text-gray-300 hover:text-gray-200 border-transparent';
  }, [isSelected]);

  return (
    <Flex
      align="center"
      className={clsx(
        'w-full border-l-4 p-[10px] px-lg duration-150 cursor-pointer gap-md',
        getSelectedStyle
      )}
      onClick={() => router.push(route)}
    >
      {getItemIcon}
      <Text weight="bold" className="hidden sm:flex">
        {children}
      </Text>
    </Flex>
  );
};
