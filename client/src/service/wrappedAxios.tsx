import Axios, { AxiosRequestConfig } from 'axios';
import { message } from 'antd';
import Cookies from 'js-cookie';

const IP = 'http://localhost:3030';

Axios.defaults.headers.common['x-auth-token'] = Cookies.get('token');

export type IWrappedAxiosResult<T> = {
  data: T | null;
  isError: boolean;
  msg: string;
};

export type ISelfDefinedConfig = {
  skipInfo?: boolean;
};

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
        !configParams.skipInfo &&
          message.error(error.response.data.errors[0].msg);
        return {
          isError: true,
          data: null,
          msg: error.response.data.errors[0]
        };
      } else {
        !configParams.skipInfo && message.error(error.response.data.msg);
        return {
          isError: true,
          data: null,
          msg: error.response.data.msg
        };
      }
    });
};
