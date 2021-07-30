import PlayerSide from './PlayerSide';
import CardZones from './CardZones';

const Table = () => {
    const Deck = [];


    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    const drawCard = () => {
        let num = getRandomInt(13);
        let suit = getRandomInt(4);

        // console.log("Table",num);
        // console.log("Table",suit);

        // if(!Deck[num]) {
        //     Deck[num] = new Array();
        // }

        // Deck[num][suit] = true;

        return [num, suit];
    }

    return (
        <div className="Table">
            <div className="ArmRest">
                <div className="TableTop">
                    <div className="TableOverlay">
                        <PlayerSide title="Enemy Score" position="Top" drawCard={drawCard}/>

                        {/* <CardZones /> */}

                        <PlayerSide title="Your Score" position="Bottom" drawCard={drawCard}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Table;