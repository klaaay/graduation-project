import React, { createContext, useReducer, useMemo, useContext } from 'react';

import { authLogin, tokenLogin } from '@/service';
import Cookies from 'js-cookie';
import Axios from 'axios';

type IAuthState = {
  hasLogin: boolean;
  isLogin: boolean;
  name: string;
  errorMsg: string;
};

const initialState: IAuthState = {
  hasLogin: false,
  isLogin: false,
  name: '',
  errorMsg: ''
};

const authContext = createContext(null);

function authReducer(state, action) {
  switch (action.type) {
    case action:
    case 'LOGIN_START':
      return {
        ...state,
        isLogin: true
      };
    case 'LOGOUT':
      return {
        hasLogin: false,
        name: ''
      };
    case 'LOGIN_SUCCESS':
      const { name } = action.payload;
      return {
        ...state,
        isLogin: false,
        hasLogin: true,
        name
      };
    case 'LOGIN_FAIL':
      const { errorMsg } = action.payload;
      return {
        ...state,
        isLogin: false,
        errorMsg
      };
    default:
      break;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const value = useMemo(() => [state, dispatch], [state]);
  return <authContext.Provider value={value} {...props} />;
}

export type IUseAuthResult = {
  state: IAuthState;
  dispatch: React.Dispatch<any>;
  login: (email: string, password: string) => void;
  logout: () => void;
};

function useAuth(): IUseAuthResult {
  const context = useContext(authContext);
  if (!context) {
    throw new Error(`useCount must be used within a CountProvider`);
  }
  const [state, dispatch] = context;

  const login = async (email, password) => {
    dispatch({
      type: 'LOGIN_START',
      payload: {
        email,
        password
      }
    });
    try {
      const { data, msg, isError } = await authLogin(email, password);
      if (!isError) {
        const { name, token } = data;
        Cookies.set('token', token);
        Axios.defaults.headers.common['x-auth-token'] = token;
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            name
          }
        });
      } else {
        dispatch({
          type: 'LOGIN_FAIL',
          payload: {
            errorMsg: msg
          }
        });
      }
    } catch (error) {}
  };
  const logout = async () => {
    await Cookies.remove('token');
    Axios.defaults.headers.common = {};
    dispatch({ type: 'LOGOUT' });
  };

  return {
    state,
    dispatch,
    login,
    logout
  };
}

export { AuthProvider, useAuth };
