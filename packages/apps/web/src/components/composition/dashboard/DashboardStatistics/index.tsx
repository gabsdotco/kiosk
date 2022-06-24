import { FC } from 'react';

import { useRecoilValue } from 'recoil';

import { Flex, Text } from '@kiosk/ui';

import {
  getAllKiosksCountSelector,
  getOpenKiosksCountSelector,
} from '@/store/kiosks';
import { getAllLogsCountSelector } from '@/store/logs';

import { DashboardStatisticsCard } from './DashboardStatisticsCard';

export const DashboardStatistics: FC = () => {
  const getAllLogsCount = useRecoilValue(getAllLogsCountSelector);
  const getAllKiosksCount = useRecoilValue(getAllKiosksCountSelector);
  const getOpenKiosksCount = useRecoilValue(getOpenKiosksCountSelector);

  return (
    <Flex direction="column" className="w-full gap-md">
      <Text weight="bold" size="md" className="text-gray-700">
        Current statistics
      </Text>
      <Flex className="w-full overflow-auto gap-md">
        <DashboardStatisticsCard
          color="primary"
          label="Total kiosks"
          value={getAllKiosksCount}
        />
        <DashboardStatisticsCard
          color="secondary"
          label="Kiosks open"
          value={getOpenKiosksCount}
        />
        <DashboardStatisticsCard
          color="gray"
          label="Total logs"
          value={getAllLogsCount}
        />
      </Flex>
    </Flex>
  );
};
