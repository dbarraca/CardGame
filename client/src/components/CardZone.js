import Card from './Card';

const CardZone = ({ position, drawnCard }) => {
    return (
        <div className={`CardZone ${position}`}>
            <Card cardCode={drawnCard}/>
        </div>
    );
}

export default CardZone;