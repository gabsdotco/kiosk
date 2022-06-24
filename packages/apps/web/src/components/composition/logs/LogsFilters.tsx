import { FC } from 'react';

import { useRecoilState } from 'recoil';

import { Button, Flex, Input } from '@kiosk/ui';

import { selectedKioskAtom } from '@/store/kiosks';
import { logsSearchFilterAtom } from '@/store/logs';

export const LogsFilters: FC = () => {
  const [selectedKioskState, setSelectedKioskState] =
    useRecoilState(selectedKioskAtom);

  const [searchFilterState, setSearchFilterState] =
    useRecoilState(logsSearchFilterAtom);

  return (
    <Flex
      justify={!!selectedKioskState ? 'between' : 'end'}
      className="flex-col w-full sm:flex-row gap-md"
    >
      {!!selectedKioskState && (
        <Button onClick={() => setSelectedKioskState(undefined)}>
          All logs
        </Button>
      )}
      <Input
        placeholder="Search..."
        className="w-full sm:w-fit"
        value={searchFilterState}
        onChange={(value) => setSearchFilterState(value)}
      />
    </Flex>
  );
};
