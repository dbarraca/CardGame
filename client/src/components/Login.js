import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);

    const usernameChange = (e) => {
        setUsername(e.target.value);
    }

    const passwordChange = (e) => {
        setPassword(e.target.value);
    }

    const error = useSelector(state => state.error);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            // Navigate to Table route
            history.push("/");
        }

        if(error.id === 'LOGIN_FAIL') {
            setErrorMsg(error.msg.msg);
        }
        else {
            setErrorMsg(null);
        }
    }, [error, isAuthenticated, history]);

    const logIn = (e) => {
        e.preventDefault();

        const user = { username, password }; 

        // Attempt to login
        dispatch(login(user));
        
        dispatch(clearErrors());
    };

    return (
        <div className="Login">
            <div className="LoginForm">
                <h1>War</h1>
                <h2>Card Game</h2>

                <h3>Login</h3>
                {errorMsg && <div className="ErrorMsg">{errorMsg}</div>}
                <label htmlFor="username">Username</label>
                <input type="text" name="username" placeholder="Username" onChange={(e) => usernameChange(e)}/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder="New Password" onChange={(e) => passwordChange(e)}/>
                <button onClick={(e) => logIn(e)}>Login</button>

                <p>Don't have an account? <Link to="/SignUp">Sign Up</Link></p>
            </div>
        </div>        
    )
}

export default Login;