import { User } from '@/types';

import { apiClient } from '../client';

export type CreateUserPayload = Omit<User, 'id'>;

export const createUserService = async (payload: CreateUserPayload) =>
  apiClient<CreateUserPayload, User>({
    url: '/user',
    method: 'POST',
    data: payload,
  });
