import { atom } from 'recoil';

import { Log } from '@/types';

const LOGS_LIST_ATOM_KEY = 'LOGS_LIST';

export const logsListAtom = atom<Log[]>({
  key: LOGS_LIST_ATOM_KEY,
  default: [],
});

const LOGS_SEARCH_FILTER_ATOM_KEY = 'LOGS_SEARCH_FILTER';

export const logsSearchFilterAtom = atom<string>({
  key: LOGS_SEARCH_FILTER_ATOM_KEY,
  default: '',
});
