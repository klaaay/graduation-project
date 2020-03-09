import wrappedAxios from './wrappedAxios';
import Cookies from 'js-cookie';

export const signUp = ({ name, email, password }) => {
  return wrappedAxios({
    method: 'post',
    url: `/api/users`,
    data: {
      name,
      email,
      password
    }
  });
};

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

export const updateProject = ({ id, data }) => {
  return wrappedAxios({
    method: 'put',
    url: `/api/projects/${id}`,
    data: data
  });
};

export const deleteProject = ({ id }) => {
  return wrappedAxios({
    method: 'delete',
    url: `/api/projects/${id}`
  });
};

export const getProjectMedias = ({ id }) => {
  return wrappedAxios({
    method: 'get',
    url: `/api/fgroup/${id}`
  });
};

export const deleteProjectMedia = ({ id }) => {
  return wrappedAxios({
    method: 'delete',
    url: `/api/fgroup/${id}`
  });
};
