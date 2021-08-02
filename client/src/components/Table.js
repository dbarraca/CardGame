import { useState, useRef } from 'react';
import PlayerSide from './PlayerSide';

const Table = () => {
    const [active, setActive]  = useState(false);

    const [winner, setWinner] = useState();

    const [wonTurn, setWonTurn] = useState("");

    const [waiting, setWaiting] = useState(-1);
    const refWaiting = useRef(waiting);

    const [players, setPlayers] = useState([
        {
            id: 1,
            title: "Player 2",
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
    
     // Keeps the state and ref equal
    function updateWaiting(newState) {
        refWaiting.current = newState;
        setWaiting(newState);
    }

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

        updateWaiting(-1);

        for (let cardCount = 0; cardCount < 52; cardCount++) {
            do{
                curCard = getRandomInt(52);
            } while(dealtCards.indexOf(curCard) >= 0);

            dealtCards.push(curCard);
        }

        updatePlayers([ 
            { ...players[0], hand: dealtCards.slice(0,26), drawnCard: -1 } ,
            { ...players[1], hand: dealtCards.slice(26), drawnCard: -1 } 
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

        // console.log(rank1, rank2);
        // console.log(played);

        if(rank1 === rank2) {
            // setInWar(true);
            
            // console.log("War");
            drawCard(players[0].id);
            // drawCard(players[0].id);
            // drawCard(players[0].id);
            drawCard(players[1].id);
            // drawCard(players[1].id);
            // drawCard(players[1].id);

            updatePlayers(refPlayers.current.map((curPlayer) => {
                return( { ...curPlayer, drawnCard: -1} )
            }));

            updateWaiting(-1);

        } else {
            // setInWar(false);

            if (rank1 > rank2) {
                // console.log("player 1 greater rank");
                updatePlayers([ { ...player1, hand: [ ...player1.hand, ...played ], drawnCard: -1 }, { ...player2, drawnCard: -1} ]);
                setWonTurn("TopWonTurn");
            }
            else {
                // console.log("player 2 greater rank");
                updatePlayers([{ ...player1, drawnCard: -1 } , { ...player2, hand: [ ...player2.hand, ...played ], drawnCard: -1 }]) ;
                setWonTurn("BottomWonTurn");
            }
            
            // setWonTurn(``);
            setTimeout(() => {
                setWonTurn("");
            }, 500);

            updatePlayedCards([]);
        }

        updateWaiting(-1);
    }

    const drawCard = (drawingPlayerID) => {
        let drawingPlayer = refPlayers.current.find(player => player.id === drawingPlayerID);

        if(!winner && drawingPlayer.hand.length <= 0) {
            setWinner(refPlayers.current.find(player => player.id !== drawingPlayerID).title);
            setActive(false);
            // console.log(`${winner} Won`);

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

            // console.log("Drawn Card", card);

            return card;
        }
    }

    const normalDraw = (drawingPlayerID) => {
        let card = drawCard(drawingPlayerID);

        if (refWaiting.current < 0) {
            updateWaiting(drawingPlayerID);
        }
        else {
            setTimeout(() => {
                compareCards();
            }, 900);
        }

        return card;
    }

    return (
        <>
            <button className="NewGame" onClick={dealHands}>Deal Cards</button>

            <div className="Table">
                <div className="ArmRest">
                    <div className={`TableTop ${wonTurn}`}>
                        <div className="TableOverlay">
                            {!active && <h1 className="StartMsg">Deal cards to begin a <br/>Game of War</h1>}

                            {
                                winner ?

                                <div className="winnerMsg">
                                    <h1>{winner} Won</h1>
                                </div>

                                :
                                
                                active &&
                                players.map( (player, index) => {
                                    return(
                                        <PlayerSide waiting={refWaiting.current} player={player} key={index} drawCard={normalDraw} /> 
                                    )
                                })
                            }
                            {
                                refPlayedCards && refPlayedCards.current && refPlayedCards.current.length > 0 &&
                                <div className="PlayedCount">{refPlayedCards.current.length} Card{refPlayedCards.current.length > 1 ? "s":""}</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Table;