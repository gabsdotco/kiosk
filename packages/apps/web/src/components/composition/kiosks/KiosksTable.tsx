import { FC, useState } from 'react';

import { useRouter } from 'next/router';

import { useRecoilValue, useRecoilState } from 'recoil';
import * as Icon from 'react-icons/fi';
import { Column } from 'react-table';
import { useMutation } from 'react-query';

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

import { Kiosk } from '@/types';

import {
  getFilteredKiosksSelector,
  kiosksListAtom,
  selectedKioskAtom,
} from '@/store/kiosks';
import { loggedUserAtom } from '@/store/user';

import {
  createLogService,
  deleteKioskService,
  listKiosksService,
} from '@/services';

export const KiosksTable: FC = () => {
  const router = useRouter();

  const loggedUserState = useRecoilValue(loggedUserAtom);

  const [, setKiosksListState] = useRecoilState(kiosksListAtom);
  const [, setSelectedKioskState] = useRecoilState(selectedKioskAtom);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedKioskToDelete, setSelectedKioskToDelete] = useState<Kiosk>();

  const getFilteredKiosks = useRecoilValue(getFilteredKiosksSelector);

  const deleteKioskMutation = useMutation(
    async () => {
      if (!!selectedKioskToDelete) {
        await deleteKioskService(selectedKioskToDelete.id);

        if (!!loggedUserState) {
          await createLogService({
            userId: loggedUserState.id,
            kioskId: selectedKioskToDelete.id,
            description: 'Deleted the Kiosk',
            action: 'DELETE',
          });
        }
      }
    },
    {
      onSuccess: async () => {
        const resp = await listKiosksService();

        setKiosksListState(resp.data);
        setIsDeleteModalOpen(false);
      },
    }
  );

  const handleKioskDelete = (kiosk: Kiosk) => {
    setSelectedKioskToDelete(kiosk);
    setIsDeleteModalOpen(true);
  };

  const handleGoToKioskLogs = (kiosk: Kiosk) => {
    setSelectedKioskState(kiosk);
    router.push('/logs');
  };

  const tableColumns: Column<Kiosk>[] = [
    { Header: '#', accessor: 'id', width: '10%' },
    { Header: 'Serial', accessor: 'serialKey', width: '20%' },
    { Header: 'Description', accessor: 'description', width: '20%' },
    {
      width: '20%',
      Header: 'Closed',
      accessor: ({ isKioskClosed }) => (isKioskClosed ? 'Yes' : 'No'),
    },
    { width: '10%', Header: 'Opens At', accessor: 'storeOpensAt' },
    { width: '10%', Header: 'Closes At', accessor: 'storeClosesAt' },
    {
      width: '10%',
      Header: 'Actions',
      accessor: (kiosk) => (
        <Flex className="gap-sm">
          <Flex
            className="text-gray-200 duration-150 border border-gray-100 cursor-pointer text-md p-sm hover:bg-primary-300 hover:text-white hover:border-primary-300"
            onClick={() => handleGoToKioskLogs(kiosk)}
          >
            <Icon.FiFile />
          </Flex>
          <Flex
            className="text-gray-200 duration-150 border border-gray-100 cursor-pointer text-md p-sm hover:bg-secondary-300 hover:text-white hover:border-secondary-300"
            onClick={() => router.push(`/kiosks/${kiosk.id}/edit`)}
          >
            <Icon.FiEdit />
          </Flex>
          <Flex
            className="text-gray-200 duration-150 border border-gray-100 cursor-pointer text-md p-sm hover:bg-red-300 hover:text-white hover:border-red-300"
            onClick={() => handleKioskDelete(kiosk)}
          >
            <Icon.FiTrash />
          </Flex>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <Table data={getFilteredKiosks} columns={tableColumns} />
      <Modal isOpen={isDeleteModalOpen}>
        <ModalHeader
          onClose={() =>
            !deleteKioskMutation.isLoading && setIsDeleteModalOpen(false)
          }
        >
          Delete kiosk?
        </ModalHeader>
        <ModalBody>
          <Text className="text-gray-700">
            You are about to delete the{' '}
            <Text className="text-primary-700">
              Kiosk #{selectedKioskToDelete?.id}
            </Text>
            , are you sure about that?
          </Text>
        </ModalBody>
        <ModalFooter className="justify-end gap-sm">
          <Button
            variant="secondary"
            disabled={deleteKioskMutation.isLoading}
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            disabled={deleteKioskMutation.isLoading}
            onClick={() => deleteKioskMutation.mutate()}
          >
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
