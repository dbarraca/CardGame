

const Card = ({ Suit, Number }) => {
    let SuitIcon;

    switch (Suit) {
        case "Hearts":
            SuitIcon = '\u2660';
            break;
        case "Spades":
            SuitIcon = '\u2665';
            break;
        case "Diamonds":
            SuitIcon = '\u2666';
            break;
        case "Clubs":
            SuitIcon = '\u2663';
            break;
        default:       
    }

    return (
        <div className={`Card ${Suit}`}>
            <div className="Number">A</div>
            <div className="Suit">{SuitIcon}</div>
            <div className="Number">A</div>
        </div>
    );
}

export default Card;