import '../style/grid.css'
import { useSelector, useDispatch } from 'react-redux';
import Tile from './Tile';
import { useEffect } from 'react';
import { reset, bot, checkWinner } from '../store/reducer';
import { Game } from '../types';

const Grid = () => {
    const dispatch = useDispatch();
    const {game, win, turn} = useSelector((state: Game) => state.grid);
    
    const newGame = () => {
        dispatch(reset(true));
    }

    useEffect(() => {
        if (turn === 'O') {
            dispatch(bot());
        }
    }, [turn])

    return (
        <div className='grid-container'>
            <div className='grid'>
                { game && game.map((item, idx) => {
                    return (
                        <div key={idx}>
                            <Tile idx={idx}/>
                        </div>
                    )
                })}
            </div>
            <div>
                <div onClick={() => newGame()}>New Game</div>
                <div>
                    <div>score</div>
                    <div>X:</div>
                    <div>O:</div>
                </div>
            </div>
            { win &&
                <div className='winner'>
                    The winner is {win}
                </div> 
            }
        </div>
    )
}
export default Grid;
