import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import withAuth from './withAuth';
import Login from './Pages/Login';
import Main from './Pages/Main';

const App = () => {
  return(
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={withAuth(Main)} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;