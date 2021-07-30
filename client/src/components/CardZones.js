import Card from './Card';

const CardZones = () => {
    return (
        <div className="CardZones">
            <Card Suit="Hearts"/>
            <Card Suit="Spades" />
            <Card Suit="Diamonds" />
            <Card Suit="Clubs" />
        </div>
    );
}

export default CardZones;