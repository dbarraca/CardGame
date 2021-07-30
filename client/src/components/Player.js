import { useState } from 'react';

import Hand from './Hand';
import Score from './Score';
import CardFlip from './CardFlip';

const Player = ({ title, position, flipping, handleDraw}) => {

    return (
        <div className={`Player ${position}`}>
            <Score title={title} />
            <CardFlip handleDraw={handleDraw} flipping={flipping}/>
            <Hand position={position}/>
        </div>
    )
}

export default Player;