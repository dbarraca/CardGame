import Card from './Card';

const CardZone = ({ position, drawnNum, drawnSuit }) => {
    return (
        <div className={`CardZone ${position}`}>
            <Card Num={drawnNum} Suit={drawnSuit}/>
        </div>
    );
}

export default CardZone;