import { useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import { useMutation, useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from '@kiosk/ui';

import { MainLayout } from '@/components/layouts';

import { NextPageWithLayout } from '@/types';

import {
  createLogService,
  getKioskService,
  updateKioskService,
} from '@/services';

import { loggedUserAtom } from '@/store/user';

const EditKioskPage: NextPageWithLayout = () => {
  const router = useRouter();

  const { id: kioskId } = router.query;

  const loggedUserState = useRecoilValue(loggedUserAtom);

  const [kioskSerialKey, setKioskSerialKey] = useState('');
  const [kioskDescription, setKioskDescription] = useState('');
  const [kioskIsClosed, setKioskIsClosed] = useState(false);
  const [kioskStoreOpensAt, setKioskStoreOpensAt] = useState('08:00');
  const [kioskStoreClosesAt, setKioskStoreClosesAt] = useState('18:00');

  const canSubmitForm = useMemo(
    () =>
      !!(
        kioskSerialKey &&
        kioskDescription &&
        kioskStoreOpensAt &&
        kioskStoreClosesAt
      ),
    [kioskSerialKey, kioskDescription, kioskStoreOpensAt, kioskStoreClosesAt]
  );

  useQuery(
    [`query:kiosks:${kioskId}`],
    async () => {
      const resp = await getKioskService(Number(kioskId));
      return resp.data;
    },
    {
      onSuccess: (data) => {
        setKioskSerialKey(data.serialKey);
        setKioskDescription(data.description);
        setKioskStoreOpensAt(data.storeOpensAt);
        setKioskStoreClosesAt(data.storeClosesAt);
        setKioskIsClosed(data.isKioskClosed);
      },
    }
  );

  const updateKioskMutation = useMutation(
    async () => {
      const resp = await updateKioskService({
        id: Number(kioskId),
        serialKey: kioskSerialKey,
        description: kioskDescription,
        storeOpensAt: kioskStoreOpensAt,
        storeClosesAt: kioskStoreClosesAt,
        isKioskClosed: kioskIsClosed,
      });

      if (!!loggedUserState) {
        await createLogService({
          userId: loggedUserState.id,
          kioskId: resp.data.id,
          description: 'Updated the Kiosk',
          action: 'UPDATE',
        });
      }
    },
    {
      onSuccess: () => {
        router.push('/kiosks');
      },
    }
  );

  return (
    <Flex direction="column" className="w-full h-full gap-lg">
      <Flex direction="column">
        <Heading size="xl" weight="black" className="text-gray-900">
          Edit Kiosk #{kioskId}
        </Heading>
        <Text size="md" className="text-gray-300">
          Edit the form below to update the Kiosk.
        </Text>
      </Flex>
      <Flex direction="column" className="w-full gap-md">
        <Flex className="flex-col w-full gap-md sm:flex-row">
          <FormControl>
            <FormLabel>Serial Key</FormLabel>
            <Input
              className="w-full"
              placeholder="Insert the Kiosk serial key"
              value={kioskSerialKey}
              onChange={(value) => setKioskSerialKey(value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              className="w-full"
              placeholder="Insert the description"
              value={kioskDescription}
              onChange={(value) => setKioskDescription(value)}
            />
          </FormControl>
        </Flex>
        <Flex className="flex-col w-full gap-md sm:flex-row">
          <FormControl>
            <FormLabel>Store Opens At</FormLabel>
            <Input
              type="time"
              className="w-full"
              value={kioskStoreOpensAt}
              onChange={(value) => setKioskStoreOpensAt(value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Store Closes At</FormLabel>
            <Input
              type="time"
              className="w-full"
              placeholder="Insert the description"
              value={kioskStoreClosesAt}
              onChange={(value) => setKioskStoreClosesAt(value)}
            />
          </FormControl>
        </Flex>
        <Checkbox
          placeholder="Insert the Kiosk closed status"
          value={kioskIsClosed}
          onChange={(value) => setKioskIsClosed(value)}
        >
          Closed
        </Checkbox>
      </Flex>
      <Flex justify="end" className="w-full gap-md">
        <Button
          variant="secondary"
          className="w-full sm:w-fit"
          onClick={() => router.push('/kiosks')}
        >
          Cancel
        </Button>
        <Button
          className="w-full sm:w-fit"
          disabled={!canSubmitForm || updateKioskMutation.isLoading}
          onClick={() => updateKioskMutation.mutate()}
        >
          Update
        </Button>
      </Flex>
    </Flex>
  );
};

EditKioskPage.getLayout = (page) => (
  <MainLayout title="Kiosks">{page}</MainLayout>
);

export default EditKioskPage;
