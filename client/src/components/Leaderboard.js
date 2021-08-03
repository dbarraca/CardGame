import { fetchUsers } from '../actions/userActions';

import { useEffect } from 'react';
import {  useDispatch, useSelector } from 'react-redux';


const Leaderboard = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const users = useSelector(state => state.users.items);
 
    const userItems = users && users.map(user => (
        <tr key={user._id}>
            <td>{user.username}</td>
            <td>{user.aiGamesWon}</td>
        </tr>
    ));

    return (
        <div className="Leaderboard">
            <h1>War Card Game Leaderboards</h1>

            <table className="LeaderboardTable">
                <tr>
                    <th>Username</th>
                    <th>Wins against computer</th>
                </tr>
                {userItems}
            </table>
        </div>
    )
}

export default Leaderboard;
