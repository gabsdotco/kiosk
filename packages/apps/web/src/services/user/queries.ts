import { User } from '@/types';

import { apiClient } from '../client';

export const getUserService = async (email: string) =>
  apiClient<unknown, User[]>({
    url: `/user?email=${email}`,
    method: 'GET',
  });
