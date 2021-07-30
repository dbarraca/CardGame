import Player from './Player';
import CardZones from './CardZones';
import CardZone from './CardZone';

const TableTop = () => {
    return (
        <div className="Table">
            <div className="ArmRest">
                <div className="TableTop">
                    <div className="TableOverlay">

                        <Player title="Enemy Score" position="Top"/>

                        <CardZone position="Top"/>

                        {/* <CardZones /> */}

                        <CardZone position="Bottom"/>

                        <Player title="Your Score" position="Bottom"/>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default TableTop;