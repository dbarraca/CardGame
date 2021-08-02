import './App.scss';
import { useEffect } from 'react';

import Table from './components/Table';
import Login from './components/Login';
import SignUp from './components/SignUp';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Provider } from 'react-redux'; 
import store from './store';
import { loadUser } from './actions/authActions';

function App() {
  useEffect(() => {
    store.dispatch(loadUser);
  }, [store, loadUser] );

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          
          <Route path="/" exact>
            <Login />
          </Route>

          <Route path="/SignUp" >
            <SignUp />
          </Route>

          <Route path="/Game">
            <Table />
          </Route>

        </div>
      </Router>
    </Provider>
  );
}

export default App;
