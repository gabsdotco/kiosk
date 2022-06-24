import { FC } from 'react';

import { useRecoilState } from 'recoil';

import { Button, Flex, Input } from '@kiosk/ui';

import { kiosksSearchFilterAtom, kiosksStatusFilterAtom } from '@/store/kiosks';

type KioskFilterStatus = 'open' | 'closed' | 'all';

interface KioskFilter {
  label: string;
  value: KioskFilterStatus;
}

const kioskFilters: KioskFilter[] = [
  { label: 'All', value: 'all' },
  { label: 'Open', value: 'open' },
  { label: 'Closed', value: 'closed' },
];

export const KiosksFilters: FC = () => {
  const [searchFilterState, setSearchFilterState] = useRecoilState(
    kiosksSearchFilterAtom
  );

  const [statusFilterState, setStatusFilterState] = useRecoilState(
    kiosksStatusFilterAtom
  );

  return (
    <Flex justify="between" className="flex-col w-full sm:flex-row gap-md">
      <Flex className="w-full overflow-auto gap-sm">
        {kioskFilters.map(({ label, value }) => (
          <Button
            key={value}
            variant={value === statusFilterState ? 'primary' : 'secondary'}
            onClick={() => setStatusFilterState(value)}
          >
            {label}
          </Button>
        ))}
      </Flex>
      <Input
        placeholder="Search..."
        className="w-full sm:w-fit"
        value={searchFilterState}
        onChange={(value) => setSearchFilterState(value)}
      />
    </Flex>
  );
};
