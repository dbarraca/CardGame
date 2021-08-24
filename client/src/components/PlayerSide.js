import { useState, useEffect } from 'react';
import Player from './Player';
import CardZone from './CardZone';

const PlayerSide = ({ player, drawCard, inWar }) => {
    const [flipping, setFlipping] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
          setIsMounted(true);
         
          return () => {
            setIsMounted(false);
          };
    }, [setIsMounted]);

    const flipCard = () => {
        setFlipping(true);

        setTimeout(() => {
            if(isMounted) {
                setFlipping(false);
            }
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
            <CardZone position={player.position} drawnCard={player.drawnCard} inWar={inWar}/>
            <Player player={player} handleDraw={handleDraw} flipping={flipping}/>
        </>
    )
}

export default PlayerSide;