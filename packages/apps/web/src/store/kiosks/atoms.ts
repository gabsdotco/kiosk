import { atom } from 'recoil';

import { Kiosk } from '@/types';

const KIOSKS_LIST_ATOM_KEY = 'KIOSKS_LIST';

export const kiosksListAtom = atom<Kiosk[]>({
  key: KIOSKS_LIST_ATOM_KEY,
  default: [],
});

const SELECTED_KIOSK_ATOM_KEY = 'SELECTED_KIOSK';

export const selectedKioskAtom = atom<Kiosk | undefined>({
  key: SELECTED_KIOSK_ATOM_KEY,
  default: undefined,
});

const KIOSKS_STATUS_FILTER_ATOM_KEY = 'KIOSKS_STATUS_FILTER';

export const kiosksStatusFilterAtom = atom<'all' | 'open' | 'closed'>({
  key: KIOSKS_STATUS_FILTER_ATOM_KEY,
  default: 'all',
});

const KIOSKS_SEARCH_FILTER_ATOM_KEY = 'KIOSKS_SEARCH_FILTER';

export const kiosksSearchFilterAtom = atom<string>({
  key: KIOSKS_SEARCH_FILTER_ATOM_KEY,
  default: '',
});
