import { useSelector } from "react-redux";
import { Game } from "../types";
import { useDispatch } from "react-redux";
import { reset, gameNumber } from "../store/reducer";
import '../style/score.css';

const Score = () => {
    const { scoreboard, gameCounter } = useSelector((state: Game) => state.grid);
    const dispatch = useDispatch();

    const newGame = () => {
        dispatch(reset(true));
        dispatch(gameNumber());
    }
    
    return (
        <div className='scoreContainter'>
                <div className='scoreboard'>
                    <div style={{textAlign: 'center', marginBottom: '0.1rem'}}>Score</div>
                    <div className='score'>
                        <div style={{textAlign: 'center', width: '40%'}}>X:</div> 
                        <div>{scoreboard.X}</div>
                    </div>
                    <div className='score'>
                        <div style={{textAlign: 'center', width: '40%'}}>O:</div> 
                        <div>{scoreboard.O}</div>
                    </div>
                    <div className='score'>
                        <div style={{textAlign: 'center', width: '40%'}}>T:</div> 
                        <div>{scoreboard.T}</div>
                    </div>
                </div>
                <div className='new-game-container'>
                    <div className='game-counter'>Game: {gameCounter}</div>
                    <div className='new-game' onClick={() => newGame()}>New Game</div>
                </div>
        </div>
    )
}

export default Score;