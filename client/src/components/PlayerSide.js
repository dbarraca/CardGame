import { useState } from 'react';
import Player from './Player';
import CardZone from './CardZone';

const PlayerSide = ( { player, drawCard, playerIndex } ) => {
    const [hand, setHand] = useState([]);

    const [flipping, setFlipping] = useState(false);
    // const [drawnNum, setDrawnNum] = useState(-1);
    const [drawnCard, setdrawnCard] = useState(-1);

    const flipCard = () => {
        // console.log("flip card functin called");
        setFlipping(true);

        setTimeout(() => {
            setFlipping(false);
        }, 301);
    }

    const handleDraw = () => {
        // console.log("handleDraw functin called");
        flipCard();

        // const [num, suit] = drawCard();
        // console.log("PlayerSide",num);
        // console.log("PlayerSide",suit);

        // setDrawnNum(num);
        // setDrawnSuit(suit);
        setdrawnCard(drawCard((playerIndex)));
    }

    return (
        <>
            <CardZone position={player.position} drawnCard={drawnCard}/>

            <Player player={player} handleDraw={handleDraw} flipping={flipping}/>
        </>
    )
}

export default PlayerSide;