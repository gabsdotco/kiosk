import { useRecoilState } from 'recoil';
import { useQuery } from 'react-query';

import { Flex, Heading, Text } from '@kiosk/ui';

import {
  DashboardLastLogs,
  DashboardStatistics,
} from '@/components/composition/dashboard';
import { MainLayout } from '@/components/layouts';

import { NextPageWithLayout } from '@/types';

import { listKiosksService, listLogsService } from '@/services';

import { kiosksListAtom } from '@/store/kiosks';
import { logsListAtom } from '@/store/logs';

const DashboardPage: NextPageWithLayout = () => {
  const [, setKiosksListState] = useRecoilState(kiosksListAtom);
  const [, setLogsistState] = useRecoilState(logsListAtom);

  useQuery(
    ['query:kiosks'],
    async () => {
      const resp = await listKiosksService();
      return resp.data;
    },
    {
      onSuccess: (data) => {
        setKiosksListState(data);
      },
    }
  );

  useQuery(
    ['query:logs'],
    async () => {
      const resp = await listLogsService();
      return resp.data;
    },
    {
      onSuccess: (data) => {
        setLogsistState(data);
      },
    }
  );

  return (
    <Flex direction="column" className="w-full h-full gap-lg">
      <Flex direction="column">
        <Heading size="xl" weight="black" className="text-gray-900">
          Dashboard
        </Heading>
        <Text size="md" className="text-gray-300">
          Welcome to your dashboard!
        </Text>
      </Flex>
      <DashboardStatistics />
      <DashboardLastLogs />
    </Flex>
  );
};

DashboardPage.getLayout = (page) => (
  <MainLayout title="Dashboard">{page}</MainLayout>
);

export default DashboardPage;
