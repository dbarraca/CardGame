import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addUserAIWin } from '../actions/userActions';

import PlayerSide from './PlayerSide';
import AccountMenu from './AccountMenu';

const Table = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const loggedInUser = useSelector(state => state.auth.user);

    const [active, setActive]  = useState(false);
    const [winner, setWinner] = useState();
    const [wonTurn, setWonTurn] = useState("");
    const [inWar, setInWar] = useState("");

    const [players, setPlayers] = useState([
        {
            id: 1,
            title: "Computer",
            position: "Top",
            hand: [],
            drawnCard: -1
        },
        {
            id: 2,
            title: "Player 1",
            position: "Bottom",
            hand: [],
            drawnCard: -1
        }
    ]);
    const refPlayers = useRef(players);

    const [playedCards, setPlayedCards] = useState([]);
    const refPlayedCards = useRef(playedCards);

    function updatePlayedCards(newState) {
        refPlayedCards.current = newState;
        setPlayedCards(newState);
    }

    function updatePlayers(newState) {
        refPlayers.current = newState;
        setPlayers(newState);
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    const dealHands = () => {
        let curCard;
        let dealtCards = [];

        setWinner("");
        setActive(true);

        for (let cardCount = 0; cardCount < 52; cardCount++) {
            do{
                curCard = getRandomInt(52);
            } while(dealtCards.indexOf(curCard) >= 0);

            dealtCards.push(curCard);
        }

        updatePlayers([ 
            { ...players[0], hand: dealtCards.slice(0,26), drawnCard: -1 } ,
            { ...players[1], hand: dealtCards.slice(26), drawnCard: -1 },
        ]);

        updatePlayedCards([]);
    }

    const getRank = (cardCode) => {
        return cardCode % 13;
    }

    const compareCards = () => {
        const played = refPlayedCards.current;
        const rank1 = getRank(refPlayers.current[0].drawnCard);
        const rank2 = getRank(refPlayers.current[1].drawnCard);
        const player1 = refPlayers.current[0];
        const player2 = refPlayers.current[1];

        setInWar(rank1 === rank2);

        if(rank1 === rank2) {
            drawCard(players[0].id);
            drawCard(players[0].id);
            drawCard(players[0].id);
            drawCard(players[1].id);
            drawCard(players[1].id);
            drawCard(players[1].id);

            updatePlayers(refPlayers.current.map((curPlayer) => {
                return( { ...curPlayer, drawnCard: -1} )
            }));

        } else {
            if (rank1 > rank2) {
                updatePlayers([ { ...player1, hand: [ ...player1.hand, ...played ], drawnCard: -1 }, { ...player2, drawnCard: -1} ]);
                setWonTurn("TopWonTurn");
            }
            else {
                updatePlayers([{ ...player1, drawnCard: -1 } , { ...player2, hand: [ ...player2.hand, ...played ], drawnCard: -1 }]) ;
                setWonTurn("BottomWonTurn");
            }
            
            setTimeout(() => {
                setWonTurn("");
            }, 500);

            updatePlayedCards([]);
        }
    }

    const drawCard = (drawingPlayerID) => {
        let drawingPlayer = refPlayers.current.find(player => player.id === drawingPlayerID);

        if(!winner && drawingPlayer.hand.length <= 0) {
            let winnerPlayer = refPlayers.current.find(player => player.id !== drawingPlayerID);

            setWinner(winnerPlayer.title);

            if (isAuthenticated && refPlayers.current[0].hand.length <= 0) {
                dispatch(addUserAIWin(loggedInUser.id));
            }

            setActive(false);

           return -1;
        }
        else {
            let card = drawingPlayer.hand[0];

            updatePlayedCards([...refPlayedCards.current, card]);

            updatePlayers(refPlayers.current.map((curPlayer) => {
                let curHand = curPlayer.hand;

                return(
                    { 
                        ...curPlayer, 
                        hand:
                            drawingPlayerID === curPlayer.id ?
                            curHand.slice(1, curHand.length)
                            :
                            curHand,
                        drawnCard:
                            drawingPlayerID === curPlayer.id ?
                            card
                            :
                            curPlayer.drawnCard
                    }
                )
            }));

            return card;
        }
    }

    const normalDraw = (drawingPlayerID) => {
        let card = drawCard(drawingPlayerID);

        if (refPlayers.current[0].drawnCard >= 0 && 
            refPlayers.current[1].drawnCard >= 0) {
            setTimeout(() => {
                compareCards();
            }, 900);
        }

        return card;
    }

    const bothDraw = () => {
        if (active) {
            normalDraw(refPlayers.current[0].id);
            normalDraw(refPlayers.current[1].id);
        }
    }

    return (
        <>
            <AccountMenu />

            <div className="Table">
                <div className="ArmRest">
                    <div className={`TableTop ${wonTurn}`}>
                        <div className="TableOverlay">
                            {
                                winner ?

                                <div className="winnerMsg">
                                    <h1>{winner} Won</h1>
                                </div>

                                :
                                
                                active && 
                                players.map((player) => {
                                    return (
                                        <PlayerSide player={player} key={player.id} drawCard={bothDraw} inWar={inWar}/> 
                                    )
                                })
                            }
                            {
                                active && refPlayedCards && refPlayedCards.current && refPlayedCards.current.length > 0 &&
                                <div className="PlayedCount">
                                    <div className="WarMsg">{inWar && "WAR"}</div>
                                    <div>{refPlayedCards.current.length} Card{refPlayedCards.current.length > 1 ? "s":""}</div>
                                </div>
                            }

                            {!active && <h1 className="StartMsg">Deal cards to begin a <br/>Game of War</h1>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="GameButtons">
                <button className="NewGame" onClick={dealHands}>Deal Cards</button>
                <Link className="LeaderboardButton" to="/Leaderboard">Leaderboards</Link>
            </div>
        </>
    );
}

export default Table;