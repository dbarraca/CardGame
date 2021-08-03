import { Link } from 'react-router-dom';

const SignUp = () => {
    return (
        <div className="Login">
            <div className="LoginForm">
                <h1>Join</h1>
                <h2>the War</h2>

                <h3>Sign Up</h3>

                <input type="text" placeholder="Username"/>
                <input type="password" placeholder="New Password"/>
                <input type="password" placeholder="Confirm Password"/>
                <button>Sign Up</button>

                <p>Already have an account? <Link to="/">Log In</Link></p>
            </div>
        </div>        
    )
}

export default SignUp;