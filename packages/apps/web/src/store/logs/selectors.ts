import { selector } from 'recoil';
import { cloneDeep } from 'lodash';

import { selectedKioskAtom } from '@/store/kiosks';

import { logsListAtom, logsSearchFilterAtom } from './atoms';

const GET_LOGS_COUNT_SELECTOR_KEY = 'GET_LOGS_COUNT_SELECTOR_KEY';

export const getAllLogsCountSelector = selector({
  key: GET_LOGS_COUNT_SELECTOR_KEY,
  get: ({ get }) => {
    const logs = get(logsListAtom);
    return logs.length;
  },
});

const GET_LAST_LOGS_SELECTOR_KEY = 'GET_LAST_LOGS_SELECTOR_KEY';

export const getLastLogsSelector = selector({
  key: GET_LAST_LOGS_SELECTOR_KEY,
  get: ({ get }) => {
    const logs = get(logsListAtom);

    const clonedLogs = cloneDeep(logs);

    return clonedLogs.sort((a, b) => b.id - a.id).slice(0, 5);
  },
});

const GET_FILTERED_LOGS_SELECTOR_KEY = 'GET_FILTERED_LOGS';

export const getFilteredLogsSelector = selector({
  key: GET_FILTERED_LOGS_SELECTOR_KEY,
  get: ({ get }) => {
    const logs = get(logsListAtom);
    const kiosk = get(selectedKioskAtom);

    let finalLogs = cloneDeep(logs);

    const searchFilter = get(logsSearchFilterAtom);

    if (!!kiosk) {
      const filteredLogs = finalLogs.filter((log) => log.kioskId === kiosk.id);

      finalLogs = filteredLogs;
    }

    const searchedKiosks = finalLogs
      .filter((log) => {
        const search = searchFilter.toLowerCase();

        const user = log.userId.toString().toLowerCase();
        const kiosk = log.kioskId.toString().toLowerCase();
        const action = log.action.toLowerCase();

        return (
          user.includes(search) ||
          kiosk.includes(search) ||
          action.includes(search)
        );
      })
      .sort((a, b) => (a.id > b.id ? -1 : 1));

    return searchedKiosks;
  },
});
