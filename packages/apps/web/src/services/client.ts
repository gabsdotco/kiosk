import axios, { AxiosResponse, Method } from 'axios';

interface ApiClientConfig<Data> {
  url: string;
  data?: Data;
  method?: Method;
}

export async function apiClient<Body, Response = null>(
  config: ApiClientConfig<Body>
): Promise<AxiosResponse<Response>> {
  const { data, url, method = 'GET' } = config;

  return axios({
    url,
    data,
    method,
    baseURL: process.env.API_URL,
  });
}
