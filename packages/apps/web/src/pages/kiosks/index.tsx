import { useRouter } from 'next/router';

import { useRecoilState } from 'recoil';
import * as Icon from 'react-icons/fi';
import { useQuery } from 'react-query';

import { Flex, Heading, Text } from '@kiosk/ui';

import { MainLayout } from '@/components/layouts';
import { KiosksFilters, KiosksTable } from '@/components/composition/kiosks';

import { NextPageWithLayout } from '@/types';

import { listKiosksService } from '@/services';

import { kiosksListAtom } from '@/store/kiosks';

const KiosksPage: NextPageWithLayout = () => {
  const router = useRouter();

  const [, setKiosksListState] = useRecoilState(kiosksListAtom);

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

  return (
    <Flex direction="column" className="w-full h-full gap-lg">
      <Flex direction="column">
        <Heading size="xl" weight="black" className="text-gray-900">
          Kiosks
        </Heading>
        <Text size="md" className="text-gray-300">
          Here you can create, view and manage all Kiosks.
        </Text>
      </Flex>
      <KiosksFilters />
      <KiosksTable />
      <Flex
        className="absolute z-50 text-white bg-gray-900 p-md right-[16px] bottom-[16px] cursor-pointer active:bg-gray-800 duration-150"
        onClick={() => router.push('/kiosks/create')}
      >
        <Icon.FiPlus />
      </Flex>
    </Flex>
  );
};

KiosksPage.getLayout = (page) => <MainLayout title="Kiosks">{page}</MainLayout>;

export default KiosksPage;
