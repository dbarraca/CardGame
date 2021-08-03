import { useState } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState(null);


    const usernameChange = (e) => {
        setUsername(e.target.value);
    }

    const passwordChange = (e) => {
        setPassword(e.target.value);
    }

    return (
        <div className="Login">
            <div className="LoginForm">
                <h1>War</h1>
                <h2>Card Game</h2>

                <h3>Login</h3>
                <input type="text" placeholder="Username" onChange={usernameChange}/>
                <input type="Password" placeholder="Password" onChange={passwordChange}/>
                <button>Login</button>

                <p>Don't have an account? <Link to="/SignUp">Sign Up</Link></p>
            </div>
        </div>        
    )
}

export default Login;