import { useState } from 'react';

const CardFlip = ({ position }) => {
    const [flipping, setFlipping] = useState("");

    const flipCard = () => {
        console.log("flipping");
        setFlipping("Flipping");
        // setFlipping("");
    }

    return (
        <div className={`CardFlip  Deck Card UpsideDown ${flipping}`} onClick={flipCard}>
        </div>
    )
}

export default CardFlip;