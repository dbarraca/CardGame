import { fetchUsers } from '../actions/userActions';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Leaderboard = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const users = useSelector(state => state.users.items);
 
    const userItems = users && users.map((user, index) => (
        <tr key={index}>
            <td>{user.username}</td>
            <td>{user.aiGamesWon}</td>
        </tr>
    ));

    return (
        <div className="Leaderboard">
            <h1>War Card Game Leaderboards</h1>

            <table className="LeaderboardTable">
                <tbody>
                    <tr>
                        <th>Username</th>
                        <th>Wins against AI</th>
                    </tr>
                    {userItems}
                </tbody>
            </table>

            <div className="GameButtons">
                <Link className="NewGame" to="/">Back to Table</Link>
            </div>
        </div>
    )
}

export default Leaderboard;
