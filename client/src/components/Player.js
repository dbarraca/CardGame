import Deck from './Deck';
import Score from './Score';
import CardFlip from './CardFlip';

const Player = ({ title, position }) => {
    return (
        <div className={`Player ${position}`}>
            <Score title={title} />
            <CardFlip position={position}/>
            <Deck position={position}/>
        </div>
    )
}

export default Player;