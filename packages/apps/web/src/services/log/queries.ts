import { Log } from '@/types';

import { apiClient } from '../client';

export const listLogsService = async () =>
  apiClient<unknown, Log[]>({
    url: '/log',
    method: 'GET',
  });
