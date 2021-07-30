import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="Login">
            <h1>Art of War</h1>

            <div className="LoginForm">
                <h2>Login</h2>
                <input type="email" placeholder="Username"/>
                <input type="Password" placeholder="Password"/>
                <button>Login</button>

                <p>Don't have an account? <Link to="/SignUp">Sign Up</Link></p>
            </div>
        </div>        
    )
}

export default Login;