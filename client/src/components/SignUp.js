import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/authActions';
// import { returnErrors } from '../actions/errorActions';

import { Link } from 'react-router-dom';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    const [msg, setMsg] = useState(null);

    const usernameChange = (e) => {
        setUsername(e.target.value);
    }

    const passwordChange = (e) => {
        setPassword(e.target.value);
    }

    const dispatch = useDispatch();

    // useEffect(() => {
    //     // dispatch(returnErrors());
    // }, [dispatch]);

    // const errorMsg = useSelector(state => state.msg);

    // const confirmPasswordChange = (e) => {
    //     setConfirmPassword(e.target.value);
    // }
/*


    useEffect(() => {
    }, [dispatch]);

    const isAuthenticated = useSelector(state => state.isAuthenticated);

    console.log("isAuthenticated", isAuthenticated);
*/

    const signUp = (e) => {
        e.preventDefault();

        // console.log("Attempting to register");

        const newUser = { username, password }; 

        //attempt to register
        dispatch(register(newUser));
    };

    return (
        <div className="Login">
            <div className="LoginForm">
                <h1>Join</h1>
                <h2>the War</h2>

                <h3>Sign Up</h3>

                <input type="text" name="username" placeholder="Username"  onChange={(e) => usernameChange(e)}/>
                <input type="password" name="password" placeholder="New Password" onChange={(e) => passwordChange(e)}/>
                {/* <input type="password" placeholder="confirmPassword" placeholder="Confirm Password" onChange={confirmPasswordChange}/> */}
                <button onClick={(e) => signUp(e)}>Sign Up</button>

                <p>Already have an account? <Link to="/">Log In</Link></p>
            </div>
        </div>        
    )
}

export default SignUp;