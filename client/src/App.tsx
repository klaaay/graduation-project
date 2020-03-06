import React from 'react';
import Axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

import { Switch, Route, BrowserRouter } from 'react-router-dom';

import UploadPage from '@/pages/UploadPage';
import Home from '@/pages/Home';
import Detail from '@/pages/Detail';
import AdminLogin from '@/pages/AdminLogin';
import AdminHome from '@/pages/AdminHome';
import AdminProjectDetail from '@/pages/AdminProjectDetail';
import AdminCovert from '@/pages/AdminCovert';
import { AuthProvider, useAuth } from '@/context/authContext';

function App() {
  // Axios.defaults.headers.common['x-auth-token'] = Cookies.get('token');

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/upload" component={UploadPage} />
            <Route exact path="/detail" component={Detail} />
            <Route path="/admin">
              <Switch>
                <Route exact path="/admin/login" component={AdminLogin} />
                <Route exact path="/admin/home" component={AdminHome} />
                <Route
                  exact
                  path="/admin/home/projectDetail"
                  component={AdminProjectDetail}
                />
                <Route exact path="/admin/covert" component={AdminCovert} />
              </Switch>
            </Route>
          </Switch>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
