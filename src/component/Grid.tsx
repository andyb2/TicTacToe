import '../style/grid.css';
import { useSelector, useDispatch } from 'react-redux';
import Tile from './Tile';
import Score from './Score';
import { botChoice } from '../botLogic';
import { useEffect } from 'react';
import { bot, whoseTurn } from '../store/reducer';
import { Game } from '../types';

const Grid = () => {
    const dispatch = useDispatch();
    const { game, victory, turn, gameCounter } = useSelector((state: Game) => state.grid);
    const { win } = victory;

    useEffect(() => {
        if ( gameCounter % 2 === 1) {
            dispatch(whoseTurn('X'));
        }
    }, [gameCounter])

    useEffect(() => {
        if (turn === 'O' ) {     
            if (!win) {
                const chosenTile = botChoice(game);
                dispatch(bot(chosenTile));
            }
        }
    }, [turn])

    return (
        <div className='grid-container'>
            <div className='grid'>
                { game && game.map((item, idx) => {
                    return (
                        <div className="tiles-parent" key={idx}>
                            <Tile idx={idx} item={item}/>
                        </div>
                    )
                })}
            </div>
            <Score />
            { win &&
                <div className='winner'>
                    { win === 'TIE' ? `Tie game!` : `${win} wins!` }
                </div> 
            }
        </div>
    )
}
export default Grid;
