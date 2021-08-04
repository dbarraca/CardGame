// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux'; 
import Table from './Table';
// import Login from './Login';
// import SignUp from './SignUp';
// import Leaderboard from './Leaderboard';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { loadUser } from '../actions/authActions';


const Game = () => {
    // const dispatch = useDispatch();

    // useEffect(() => {
    //   console.log("In app use effect");
    //   dispatch(loadUser());
  
    // }, [dispatch, loadUser] );
  
    return (
        <Router>
            {/* <Route path="/Login" >
                <Login />
            </Route>
             */}
            {/* <Route path="/SignUp" >
                <SignUp />
            </Route> */}
      
            <Route path="/" exact>
                <Table />
            </Route>

            {/* <Route path="/Leaderboard">
                <Leaderboard />
            </Route> */}
        </Router>  
    )
}

export default Game;