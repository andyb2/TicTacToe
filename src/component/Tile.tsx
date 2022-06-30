import '../style/tile.css';
import { useDispatch, useSelector } from 'react-redux';
import { grid, checkWinner, whoseTurn, reset } from '../store/reducer';
import { useEffect, useState } from 'react';
import { Game } from '../types';

interface IProps {
    idx: number
}

const player: null | string = null;

const Tile = ({ idx }: IProps) => {
    const dispatch = useDispatch();
    const {win, resetGame, turn, botPlacement} = useSelector((state: Game) => state.grid);
    const [localState, setLocalState] = useState<null | string>(null);
    console.log(`LOCSSS`, localState)
    const handleClick = (player: null | string) => {
        let user = player;
        !user ? user = 'X' : user = 'O';
        dispatch(grid({ user, idx }));
        setLocalState(user);
        dispatch(checkWinner(user));
        dispatch(whoseTurn(user));
    }

    useEffect(() => {
        if(resetGame) {
            setLocalState(null);
        }
        if (idx === 8) {
            dispatch(reset(false))
        }
        
    }, [resetGame])
    
    useEffect(() => {
        if (turn !== 'X' && idx === botPlacement) {
            setLocalState('O')
            dispatch(whoseTurn(turn));
            dispatch(checkWinner(turn));
        }
    }, [botPlacement])

    return (
            <div className='tile' key={idx} onClick={!win && !localState ? () => handleClick(player) : undefined}>
                { localState ? localState : '' }
            </div>
    )
}

export default Tile;