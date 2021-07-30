import { useState } from 'react';
import Player from './Player';
import CardZone from './CardZone';

const PlayerSide = ( { title, position, drawCard } ) => {
    const [flipping, setFlipping] = useState(false);
    const [drawnNum, setDrawnNum] = useState(-1);
    const [drawnSuit, setDrawnSuit] = useState(-1);

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

        const [num, suit] = drawCard();
        // console.log("PlayerSide",num);
        // console.log("PlayerSide",suit);

        setDrawnNum(num);
        setDrawnSuit(suit);
    }

    return (
        <>
            <CardZone position={position} drawnNum={drawnNum} drawnSuit={drawnSuit}/>

            <Player title={title} position={position} handleDraw={handleDraw} flipping={flipping}/>
        </>
    )
}

export default PlayerSide;