import { useState } from 'react';

import Hand from './Hand';
import Score from './Score';
import CardFlip from './CardFlip';

const Player = ({ player, flipping, handleDraw}) => {

    return (
        <div className={`Player ${player.position}`}>
            <Score title={player.title} score={player.score}/>
            <CardFlip handleDraw={handleDraw} flipping={flipping}/>
            <Hand position={player.position}/>
        </div>
    )
}

export default Player;