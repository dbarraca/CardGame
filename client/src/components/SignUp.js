import { Link } from 'react-router-dom';

const SignUp = () => {
    return (
        <div className="Login">
            <h1>Art of War</h1>

            <div className="LoginForm">
                <h2>Sign Up</h2>

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