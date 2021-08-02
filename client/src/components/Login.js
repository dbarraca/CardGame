import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="Login">
            <div className="LoginForm">
                <h1>War Card Game</h1>

                <h3>Login</h3>
                <input type="email" placeholder="Username"/>
                <input type="Password" placeholder="Password"/>
                <button>Login</button>

                <p>Don't have an account? <Link to="/SignUp">Sign Up</Link></p>
            </div>
        </div>        
    )
}

export default Login;