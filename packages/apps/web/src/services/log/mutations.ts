import { Log } from '@/types';

import { apiClient } from '../client';

export type CreateLogPayload = Omit<Log, 'id'>;

export const createLogService = async (payload: CreateLogPayload) =>
  apiClient<CreateLogPayload, Log>({
    url: '/log',
    method: 'POST',
    data: payload,
  });
