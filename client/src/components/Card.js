

const Card = ({ cardCode }) => {
    let NumIcon= '', SuitIcon = '', SuitClass = '';
    let Num = cardCode % 13;
    let Suit = Math.floor(cardCode / 13);

    switch (Num) {
        case 12:
            NumIcon = 'A';
            break;
        case 9:
            NumIcon = 'J';
            break;
        case 10:
            NumIcon = 'Q';
            break;
        case 11:
            NumIcon = 'K';
            break;
        case -1:
            NumIcon = '';
            break;
        default:
            NumIcon = '' + (Num + 2);   
    }

    switch (Suit) {
        case 0:
            SuitIcon = '\u2660';
            SuitClass = 'Spades';
            break;
        case 1:
            SuitIcon = '\u2665';
            SuitClass= 'Hearts';
            break;
        case 2:
            SuitIcon = '\u2666';
            SuitClass= 'Diamonds';
            break;
        case 3:
            SuitIcon = '\u2663';
            SuitClass= 'Clubs';
            break;
        default:       
    }

    return (
        <div className={`Card ${SuitClass}`}>
            <div className="Number">{NumIcon}</div>
            <div className="Suit">{SuitIcon}</div>
            <div className="Number">{NumIcon}</div>
        </div>
    );
}

export default Card;