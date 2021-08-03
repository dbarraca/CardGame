import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="Login">
            <div className="LoginForm">
                <h1>War</h1>
                <h2>Card Game</h2>

                <h3>Login</h3>
                <input type="text" placeholder="Username"/>
                <input type="Password" placeholder="Password"/>
                <button>Login</button>

                <p>Don't have an account? <Link to="/SignUp">Sign Up</Link></p>
            </div>
        </div>        
    )
}

export default Login;