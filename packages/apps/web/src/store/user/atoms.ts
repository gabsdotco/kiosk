import { atom } from 'recoil';

import { User } from '@/types';

const LOGGED_USER_ATOM_KEY = 'LOGGED_USER_ATOM_KEY';

export const loggedUserAtom = atom<User | undefined>({
  key: LOGGED_USER_ATOM_KEY,
  default: undefined,
});
