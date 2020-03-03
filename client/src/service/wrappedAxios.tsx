import Axios, { AxiosRequestConfig } from 'axios';
import getToken from './getToken';
import { message } from 'antd';
const IP = 'http://localhost:3030';

export type IWrappedAxiosResult<T> = {
  data: T | null;
  isError: boolean;
  msg: string;
};

export type ISelfDefinedConfig = {
  skipInfo?: boolean;
};

Axios.defaults.headers.common['x-auth-token'] = getToken();

export default (
  configParams: AxiosRequestConfig & ISelfDefinedConfig
): Promise<IWrappedAxiosResult<any>> => {
  return Axios({ ...configParams, url: `${IP}${configParams.url}` })
    .then(res => {
      const { data, msg } = res.data;
      return {
        data: data,
        isError: false,
        msg
      };
    })
    .catch(error => {
      if (error.response.data.errors) {
        !configParams.skipInfo && message.error(error.response.data.errors[0]);
        return {
          isError: true,
          data: null,
          msg: error.response.data.errors[0]
        };
      } else {
        !configParams.skipInfo && message.error(error.response.data.msg);
        console.log(error.response.data);
        return {
          isError: true,
          data: null,
          msg: error.response.data.msg
        };
      }
    });
};
