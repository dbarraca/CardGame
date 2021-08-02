import { useState } from 'react';
import Player from './Player';
import CardZone from './CardZone';

const PlayerSide = ({ waiting, player, drawCard }) => {
    const [flipping, setFlipping] = useState(false);

    const flipCard = () => {
        setFlipping(true);

        setTimeout(() => {
            setFlipping(false);
        }, 301);
    }

    const handleDraw = () => {
        if (player.drawnCard < 0) {
            flipCard();
            drawCard(player.id);
        }
    }

    return (
        <>
            <CardZone position={player.position} drawnCard={player.drawnCard}/>

            <Player player={player} handleDraw={handleDraw} flipping={flipping}/>
        </>
    )
}

export default PlayerSide;