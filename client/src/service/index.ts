import wrappedAxios from './wrappedAxios';

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
