import { useRecoilState, useRecoilValue } from 'recoil';
import { useQuery } from 'react-query';

import { Flex, Heading, Text } from '@kiosk/ui';

import { MainLayout } from '@/components/layouts';
import { LogsFilters, LogsTable } from '@/components/composition/logs';

import { NextPageWithLayout } from '@/types';

import { listLogsService } from '@/services';

import { logsListAtom } from '@/store/logs';
import { selectedKioskAtom } from '@/store/kiosks';

const LogsPage: NextPageWithLayout = () => {
  const selectedKioskState = useRecoilValue(selectedKioskAtom);

  const [, setLogsListState] = useRecoilState(logsListAtom);

  useQuery(
    ['query:logs'],
    async () => {
      const resp = await listLogsService();
      return resp.data;
    },
    {
      onSuccess: (data) => {
        setLogsListState(data);
      },
    }
  );

  return (
    <Flex direction="column" className="w-full h-full gap-lg">
      <Flex direction="column">
        <Heading size="xl" weight="black" className="text-gray-900">
          {selectedKioskState
            ? `Kiosk #${selectedKioskState.id} logs`
            : 'All Logs'}
        </Heading>
        <Text size="md" className="text-gray-300">
          Here you can see all the logs made by the users during the{' '}
          {selectedKioskState ? (
            <Text className="text-primary-600">
              Kiosk #{selectedKioskState.id + ' '}
            </Text>
          ) : (
            'Kiosks '
          )}
          management.
        </Text>
      </Flex>
      <LogsFilters />
      <LogsTable />
    </Flex>
  );
};

LogsPage.getLayout = (page) => <MainLayout title="Logs">{page}</MainLayout>;

export default LogsPage;
