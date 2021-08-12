import { useDispatch } from 'react-redux';
import { logout } from '../actions/authActions';

const Logout = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <button onClick={handleLogout} className="LogoutButton">Log Out</button> 
    )
}

export default Logout;