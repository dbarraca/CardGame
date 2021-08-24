import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logout from './Logout';
    
const AccountMenu = () => {
    const [ userWins, setUserWins ]= useState();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        if(user)
            setUserWins(user.aiGamesWon);
    }, [user])

    const loggedOut = (
        <>
            <Link className="LoginButton" to="/Login">Log In</Link>
            <Link className="SignUpButton" to="/SignUp">SignUp</Link>
        </>
    );

    const loggedIn = (
        <>
            <div className="UserHello">
                {user && 
                    <>
                        Welcome {user.username}, 
                        <div className="UserWins">You have <b>{userWins}</b> wins against AI</div>
                    </>
                }
            </div>
           
            <Logout />
        </>
    )

    return (
        <div className="AccountMenu">
            {isAuthenticated ? loggedIn : loggedOut}
        </div>
    )
}

export default AccountMenu;