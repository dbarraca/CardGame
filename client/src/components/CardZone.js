import Card from './Card';

const CardZone = ({ position }) => {
    return (
        <div className={`CardZone ${position}`}>
            <Card Suit="Hearts"/>
        </div>
    );
}

export default CardZone;