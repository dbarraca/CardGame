import './App.scss';
import Table from './components/Table';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
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
  );
}

export default App;
