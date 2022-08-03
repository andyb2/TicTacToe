import '../style/tile.css';
import { useDispatch, useSelector } from 'react-redux';
import { playerChoice, checkWinner, whoseTurn, reset } from '../store/reducer';
import { useEffect, useState } from 'react';
import { Game } from '../types';

interface IProps {
    idx: number
    item: string
}

const player: null | string = null;

const Tile = ({ idx, item }: IProps) => {
    const dispatch = useDispatch();
    const {victory, turn, botPlacement} = useSelector((state: Game) => state.grid);
    const { win, winningSet } = victory;
    const [localState, setLocalState] = useState<string | null>(null);
    const [victoryStyle, setVictoryStyle] = useState<string>('');

    const showWinningTile = () => {
        setVictoryStyle('victoryTile')
    }

    const handleClick = (player: null | string) => {
        let user = player;
        !user ? user = 'X' : user = 'O';
        dispatch(playerChoice({ user, idx }));
        setLocalState(user);
        dispatch(checkWinner(user));
        dispatch(whoseTurn(user));
    }

    useEffect(() => {
        setLocalState(item);
        setVictoryStyle('');
    }, [item])
    
    useEffect(() => {
        if (turn === 'O' && idx === botPlacement) {
            setLocalState(turn);
            dispatch(checkWinner(turn));
            dispatch(whoseTurn(turn));
        }
    }, [botPlacement])

    useEffect(() => {
        if (winningSet && winningSet.includes(idx)) {
            setTimeout(showWinningTile, (winningSet.indexOf(idx)*700))
        }
    }, [winningSet])

    return (
            <div className={`tile ${victoryStyle ? victoryStyle : ''}`} key={idx} onClick={!win && !localState ? () => handleClick(player) : undefined}>
                { localState ? localState : '' }
            </div>
    )
}

export default Tile;