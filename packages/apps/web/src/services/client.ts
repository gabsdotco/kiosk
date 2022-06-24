import axios, { AxiosResponse, Method } from 'axios';

const API_URL = 'http://localhost:8080';

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
    baseURL: API_URL,
  });
}
