import { FC, useMemo } from 'react';

import clsx from 'clsx';

import { Flex, Heading, Text } from '@kiosk/ui';

export interface DashboardStatisticsCardProps {
  label: string;
  value: number;
  color: 'primary' | 'secondary' | 'gray';
}

export const DashboardStatisticsCard: FC<DashboardStatisticsCardProps> = ({
  label,
  value,
  color,
}) => {
  const getCardStyle = useMemo(() => {
    const colors = {
      primary: 'bg-primary-50 border-primary-300',
      secondary: 'bg-secondary-50 border-secondary-200',
      gray: 'bg-gray-50 border-gray-100',
    };

    return colors[color];
  }, [color]);

  const getLabelStyle = useMemo(() => {
    const colors = {
      primary: 'text-primary-700',
      secondary: 'text-secondary-700',
      gray: 'text-gray-700',
    };

    return colors[color];
  }, [color]);

  const getValueStyle = useMemo(() => {
    const colors = {
      primary: 'text-primary-800',
      secondary: 'text-secondary-800',
      gray: 'text-gray-800',
    };

    return colors[color];
  }, [color]);

  return (
    <Flex
      direction="column"
      className={clsx(
        'w-full min-w-full md:min-w-fit border p-lg gap-sm',
        getCardStyle
      )}
    >
      <Text weight="bold" size="md" className={clsx(getLabelStyle)}>
        {label}
      </Text>
      <Heading weight="bold" size="4xl" className={clsx(getValueStyle)}>
        {value}
      </Heading>
    </Flex>
  );
};
