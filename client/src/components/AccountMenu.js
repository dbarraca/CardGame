import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logout from './Logout';
    
const AccountMenu = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user);

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
                        <div className="UserWins">You have <b>{user.aiGamesWon}</b> wins against AI</div>
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