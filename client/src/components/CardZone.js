import Card from './Card';

const CardZone = ({ position, drawnCard, inWar }) => {

    return (
        <div className={`CardZone ${position} ${inWar && "UpsideDown"}`}>
            <Card cardCode={drawnCard}/>
        </div>
    );
}

export default CardZone;