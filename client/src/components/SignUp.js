import { Link } from 'react-router-dom';

const SignUp = () => {
    return (
        <div className="Login">
            <div className="LoginForm">
                <h1>Join the War</h1>

                <h3>Sign Up</h3>

                <input type="email" placeholder="Username"/>
                <input type="password" placeholder="New Password"/>
                <input type="password" placeholder="Confirm Password"/>
                <button>Sign Up</button>

                <p>Already have an account? <Link to="/">Log In</Link></p>
            </div>
        </div>        
    )
}

export default SignUp;