import { selector } from 'recoil';
import { cloneDeep } from 'lodash';

import {
  kiosksListAtom,
  kiosksSearchFilterAtom,
  kiosksStatusFilterAtom,
} from './atoms';

const GET_ALL_KIOSKS_COUNT_SELECTOR_KEY = 'GET_ALL_KIOSKS_COUNT_SELECTOR_KEY';

export const getAllKiosksCountSelector = selector({
  key: GET_ALL_KIOSKS_COUNT_SELECTOR_KEY,
  get: ({ get }) => {
    const kiosks = get(kiosksListAtom);
    return kiosks.length;
  },
});

const GET_OPEN_KIOSKS_COUNT_SELECTOR_KEY = 'GET_OPEN_KIOSKS_COUNT_SELECTOR_KEY';

export const getOpenKiosksCountSelector = selector({
  key: GET_OPEN_KIOSKS_COUNT_SELECTOR_KEY,
  get: ({ get }) => {
    const kiosks = get(kiosksListAtom);
    const filteredKiosks = kiosks.filter((kiosk) => !kiosk.isKioskClosed);

    return filteredKiosks.length;
  },
});

const GET_FILTERED_KIOSKS_SELECTOR_KEY = 'GET_FILTERED_KIOSKS';

export const getFilteredKiosksSelector = selector({
  key: GET_FILTERED_KIOSKS_SELECTOR_KEY,
  get: ({ get }) => {
    const kiosks = get(kiosksListAtom);

    let finalKiosks = cloneDeep(kiosks);

    const statusFilter = get(kiosksStatusFilterAtom);
    const searchFilter = get(kiosksSearchFilterAtom);

    if (statusFilter === 'closed') {
      const closedKiosks = finalKiosks.filter((kiosk) => !!kiosk.isKioskClosed);

      finalKiosks = closedKiosks;
    } else if (statusFilter === 'open') {
      const openKiosks = finalKiosks.filter((kiosk) => !kiosk.isKioskClosed);

      finalKiosks = openKiosks;
    }

    const searchedKiosks = finalKiosks
      .filter((kiosk) => {
        const search = searchFilter.toLowerCase();

        const id = kiosk.id.toString().toLowerCase();
        const serialKey = kiosk.serialKey.toLowerCase();
        const description = kiosk.description.toLowerCase();

        return (
          id.includes(search) ||
          serialKey.includes(search) ||
          description.includes(search)
        );
      })
      .sort((a, b) => (a.id > b.id ? -1 : 1));

    return searchedKiosks;
  },
});
