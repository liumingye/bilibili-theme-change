import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { message } from 'antd';

const service = Axios.create({
  timeout: 50000,
});

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (error: { message: string }) => {
    message.error(error.message);
  }
);

service.interceptors.response.use(
  (response: AxiosResponse): Promise<unknown> => {
    return Promise.resolve(response);
  },
  (error: { message: string }) => {
    message.destroy();
    message.error('网络异常');

    return Promise.reject(error);
  }
);

const request = <T = unknown>(config: AxiosRequestConfig): Promise<T> => {
  return new Promise((resolve, reject) => {
    service
      .request(config)
      .then((res: AxiosResponse) => resolve(res.data))
      .catch((err: { message: string }) => reject(err));
  });
};

request.get = <T = unknown>(url: string, params?: object): Promise<T> =>
  request({
    method: 'get',
    url,
    params,
  });

request.post = <T = unknown>(url: string, params?: object): Promise<T> =>
  request({
    method: 'post',
    url,
    data: params,
  });

request.delete = <T = unknown>(url: string, params?: object): Promise<T> =>
  request({
    method: 'delete',
    url,
    params,
  });

request.put = <T = unknown>(url: string, params?: object): Promise<T> =>
  request({
    method: 'put',
    url,
    data: params,
  });

request.patch = <T = unknown>(url: string, params?: object): Promise<T> =>
  request({
    method: 'patch',
    url,
    data: params,
  });

export default request;
