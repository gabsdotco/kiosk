import { FC } from 'react';

import { Column } from 'react-table';
import { useRecoilValue } from 'recoil';

import { Flex, Table, Text } from '@kiosk/ui';

import { Log } from '@/types';

import { getLastLogsSelector } from '@/store/logs';

export const DashboardLastLogs: FC = () => {
  const getLastLogs = useRecoilValue(getLastLogsSelector);

  const tableColumns: Column<Log>[] = [
    { Header: '#', accessor: 'id', width: '10%' },
    { Header: 'Action', accessor: 'action', width: '20%' },
    { Header: 'Description', accessor: 'description', width: '20%' },
    { width: '10%', Header: 'Kiosk', accessor: 'kioskId' },
    { width: '10%', Header: 'User', accessor: 'userId' },
  ];

  return (
    <Flex direction="column" className="w-full h-full overflow-auto gap-md">
      <Text weight="bold" size="md" className="text-gray-700">
        Last logs
      </Text>
      <Table pagination={false} data={getLastLogs} columns={tableColumns} />
    </Flex>
  );
};
