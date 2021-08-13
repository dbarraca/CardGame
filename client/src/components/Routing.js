import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import Table from './Table';
import Login from './Login';
import SignUp from './SignUp';
import Leaderboard from './Leaderboard';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { loadUser } from '../actions/authActions';

const Routing = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.token);

    useEffect(() => {
        if (!token)
            dispatch(loadUser());
  
    }, [dispatch, loadUser] );
  
    return (
        <Router>
            <Route path="/Login" >
                <Login />
                 {/* {loggedIn ? <Redirect to="/" /> : <Login /> */}
            </Route>
            
            <Route path="/SignUp" >
                <SignUp />
            </Route>
      
            <Route path="/" exact>
                <Table />
            </Route>

            <Route path="/Leaderboard">
                <Leaderboard />
            </Route>
        </Router>  
    )
}

export default Routing;