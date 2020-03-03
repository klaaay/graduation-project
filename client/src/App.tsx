import React from 'react';

import { Switch, Route, BrowserRouter } from 'react-router-dom';

import UploadPage from '@/pages/UploadPage';
import Home from '@/pages/Home';
import Detail from '@/pages/Detail';
import AdminLogin from '@/pages/AdminLogin';
import AdminHome from '@/pages/AdminHome';
import { AuthProvider, useAuth } from '@/context/authContext';

function App() {
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
              </Switch>
            </Route>
          </Switch>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
