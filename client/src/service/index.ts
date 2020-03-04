import wrappedAxios from './wrappedAxios';
import Cookies from 'js-cookie';

export const authLogin = (email, password) => {
  return wrappedAxios({
    method: 'post',
    url: `/api/auth`,
    data: {
      email,
      password
    }
  });
};

export const tokenLogin = () => {
  return wrappedAxios({
    method: 'get',
    url: `/api/auth`,
    skipInfo: true
    // headers: {
    //   'x-auth-token': Cookies.get('token')
    // }
  });
};

export const getProjects = () => {
  return wrappedAxios({
    method: 'get',
    url: `/api/projects`
    // headers: {
    //   'x-auth-token': Cookies.get('token')
    // }
  });
};

export const getTypes = () => {
  return wrappedAxios({
    method: 'get',
    url: `/api/info/nav`
  });
};

export const createProject = ({ type, name, description }) => {
  return wrappedAxios({
    method: 'post',
    url: `/api/projects`,
    data: {
      type,
      name,
      description
    }
  });
};
