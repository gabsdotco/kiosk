import { Kiosk } from '@/types';

import { apiClient } from '../client';

export type CreateKioskPayload = Omit<Kiosk, 'id'>;

export const createKioskService = async (payload: CreateKioskPayload) =>
  apiClient<CreateKioskPayload, Kiosk>({
    url: `/kiosk`,
    method: 'POST',
    data: payload,
  });

export type UpdateKioskPayload = Kiosk;

export const updateKioskService = async (payload: UpdateKioskPayload) =>
  apiClient<UpdateKioskPayload, Kiosk>({
    url: `/kiosk/${payload.id}`,
    method: 'PUT',
    data: payload,
  });

export const deleteKioskService = async (id: number) =>
  apiClient<unknown, unknown>({
    url: `/kiosk/${id}`,
    method: 'DELETE',
  });
