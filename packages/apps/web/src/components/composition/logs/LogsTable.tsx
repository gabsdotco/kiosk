import { FC } from 'react';

import { useRecoilValue } from 'recoil';
import { Column } from 'react-table';

import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
  Text,
} from '@kiosk/ui';

import { Log } from '@/types';

import { getFilteredLogsSelector } from '@/store/logs';

export const LogsTable: FC = () => {
  const getFilteredLogs = useRecoilValue(getFilteredLogsSelector);

  const tableColumns: Column<Log>[] = [
    { Header: '#', accessor: 'id', width: '10%' },
    { Header: 'Action', accessor: 'action', width: '20%' },
    { Header: 'Description', accessor: 'description', width: '20%' },
    { width: '10%', Header: 'Kiosk', accessor: 'kioskId' },
    { width: '10%', Header: 'User', accessor: 'userId' },
  ];

  return <Table data={getFilteredLogs} columns={tableColumns} />;
};
