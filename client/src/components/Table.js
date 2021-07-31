import { useState } from 'react';
import PlayerSide from './PlayerSide';
import CardZones from './CardZones';

const Table = () => {
    const [players, setPlayers] = useState([
        {
            id: 1,
            title: "Enemy Cards",
            position: "Top" ,
            score: 0,
            hand: []
        },
        {
            id: 2,
            title: "Your Cards",
            position: "Bottom" ,
            score: 0,
            hand: []
        }
    ]);

    const [playedCards, setPlayedCards] = useState([]);

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    const dealHands = () => {
        let curCard;
        let dealtCards = [];

        for (let cardCount = 0; cardCount < 52; cardCount++) {
            do{
                curCard = getRandomInt(52);
            } while(dealtCards.indexOf(curCard) >= 0);

            dealtCards.push(curCard);
        }

        console.log(dealtCards);

        setPlayers([ 
            { ...players[0], hand: [...dealtCards.slice(0, 26)] } ,
            { ...players[1], hand: [...dealtCards.slice(26)] } 
        ]);

        setPlayedCards([]);
    }
    
    const drawCard = (drawingPlayer) => {
        let card = players[drawingPlayer].hand[0];
        setPlayedCards([...playedCards, card]);

        setPlayers(players.map((curPlayer, index) => {
            let curHand = players[index].hand;

            return(
                { ...curPlayer, hand:
                drawingPlayer === index ?
                curHand.slice(1, curHand.length)
                :
                curHand
                }
            )
        }));

        return card;
    }

    return (
        <>
            <button className="NewGame" onClick={dealHands}>New Game</button>

            <div className="Table">
                <div className="ArmRest">
                    <div className="TableTop">
                        <div className="TableOverlay">
                            {players.map((player, index) => {
                                return(
                                    <PlayerSide player={player} playerIndex={index} key={index} drawCard={drawCard} /> 
                                )
                            })}

                            {/* <PlayerSide title="Enemy Cards" position="Top" drawCard={drawCard} /> */}
                            {/* <CardZones /> */}
                            {/* <PlayerSide title="Your Cards" position="Bottom" drawCard={drawCard}/> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Table;