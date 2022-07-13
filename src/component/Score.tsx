import { useSelector } from "react-redux";
import { Game } from "../types";
import { useDispatch } from "react-redux";
import { reset, whoseTurn, gameNumber } from "../store/reducer";
import '../style/score.css';

const Score = () => {
    const { scoreboard, gameCounter } = useSelector((state: Game) => state.grid);
    const dispatch = useDispatch();

    const newGame = () => {
        dispatch(reset(true));
        dispatch(gameNumber());
    }
    
    return (
        <div className='score'>
            <div>
                <div className='new-game' onClick={() => newGame()}>New Game</div>
                <div className='scoreboard'>
                    <div style={{marginBottom: '0.5rem'}}>game: {gameCounter}</div>
                    <div style={{textAlign: 'center', marginBottom: '0.5rem'}}>score</div>
                    <div>X: {scoreboard.X}</div>
                    <div>O: {scoreboard.O}</div>
                    <div>Tie: {scoreboard.T}</div>
                </div>
            </div>
        </div>
    )
}

export default Score;