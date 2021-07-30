const CardFlip = ({ handleDraw, flipping }) => {

    return (
        <div className={`CardFlip  Deck Card UpsideDown ${flipping ? "Flipping" : ""}`} onClick={handleDraw}>
        </div>
    )
}

export default CardFlip;