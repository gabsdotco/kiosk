import { Kiosk } from '@/types';

import { apiClient } from '../client';

export const getKioskService = async (id: number) =>
  apiClient<unknown, Kiosk>({
    url: `/kiosk/${id}`,
    method: 'GET',
  });

export const listKiosksService = async () =>
  apiClient<unknown, Kiosk[]>({
    url: '/kiosk',
    method: 'GET',
  });
