import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { winConditions } from '../../winCondition';

interface GridPayload {
    idx: number
    user: string
}

interface IState {
    game: String[]
    win: null
    turn: string
    resetGame: boolean
    botPlacement: null | number
}

const initialState: IState = {
    game: [
    '', '', '',
    '', '', '',
    '', '', '',
    ],
    win: null,
    turn: '',
    resetGame: false,
    botPlacement: null,
}



const winnerSlice = createSlice({
    name: 'grid',
    initialState,
    reducers: {
        grid: (state, action: PayloadAction<GridPayload>) => {
            const gridCopy = [...state.game];
            gridCopy[action.payload.idx] = action.payload.user;
            state.game = gridCopy;
        },
        whoseTurn: (state, action) => {
            const user = action.payload;
            let otherPlayer: string | null;
            if (user === 'X') {
                otherPlayer = 'O';
            } else {
                otherPlayer = 'X';
            }
            state.turn = otherPlayer;
        },
        checkWinner: (state, action) => {
            const gameCopy = [...state.game];
            let win = 0;
            for(let i=0; i<winConditions.length; i++) {
                for(let j=0; j<winConditions[i].length; j++) {
                    if (gameCopy[winConditions[i][j]] === action.payload) {
                        win++;
                    }
                }
                if (win !== 3) {
                    win = 0;
                } else {
                    break;
                }
            }
            
            if (win === 3) {
                state.win = action.payload;
            } 
        },
        reset: (state, action) => {
            if (action.payload) {
                const emptyBoard = [
                    '', '', '',
                    '', '', '',
                    '', '', '',
                ];
                state.resetGame = action.payload;
                state.game = emptyBoard;
                state.win = null;
                state.turn = '';
                state.botPlacement = null;
            } else {
                state.resetGame = false;
            }
        },
        bot: (state) => {
            const gameCopy = [...state.game];
            const opposingMoves = new Map()
            let idxOfTile: number | null = null;
            let winTile: number | null = null;
            const chanceToWin = new Map();
            // Check opposing players potential win status of the game
            // If the opponent has a potential win the bot will block the tile
            for (let i=0; i<winConditions.length; i++) {
                for (let j=0; j<winConditions[i].length; j++) {
                    // When the bot and player has 2 out 3 tiles selected from the winConditions arrays ignore it
                    if (gameCopy[winConditions[i][j]] === 'O') {
                        opposingMoves.clear();
                        break;
                    }
                    // if theres an open tile in winConditions add the tile to opposingMoves
                    if (gameCopy[winConditions[i][j]] === '') {
                        opposingMoves.set(winConditions[i][j], gameCopy[winConditions[i][j]]);
                    }
                    // if the opposingMoves contains more than one tile it will be clearead... meaning
                    // the bot doesn't have to block the tile because its not winnable 
                    if (opposingMoves.size > 1) {
                        opposingMoves.clear();
                        break;
                    }
                }
                // if the opposingMoves contains one tile the bot will block it to stop a win from X
                if (opposingMoves.size === 1) {
                    const catchTile = opposingMoves.keys().next().value;
                    idxOfTile = catchTile;
                    // gameCopy[catchTile] = state.turn;
                    break;
                };
            }
            if (idxOfTile) {
                for (let i=0; i<winConditions.length; i++) {
                    for (let j=0; j<winConditions[j].length; j++) {
                        if (gameCopy[winConditions[i][j]] === 'X') {
                            chanceToWin.clear();
                            break;
                        }
                        if (gameCopy[winConditions[i][j]] === '') {
                            chanceToWin.set([winConditions[i][j]], gameCopy[winConditions[i][j]])
                        }
                        if (chanceToWin.size > 1) {
                            chanceToWin.clear();
                        }
                    }
                    if (chanceToWin.size === 1) {
                        const winningTile = opposingMoves.keys().next().value;
                        winTile = winningTile;
                        console.log(`WE HAVE A WINNER`, winningTile)
                        gameCopy[winningTile] = state.turn;
                        break;
                    }
                }
            }
            // If there are no opposing potential winning tiles then the bot will select a random tile
            if (!gameCopy.indexOf('O') || !winTile) {
                for (let i=0; i<gameCopy.length; i++) {
                    const botChoice = Math.floor(Math.random() * gameCopy.length);
                    if (gameCopy[botChoice] === '') {
                        idxOfTile = botChoice
                        gameCopy[idxOfTile] = 'O';
                        break;
                    }
                    
                }
            }
            if (!chanceToWin && idxOfTile) {
                gameCopy[idxOfTile] = state.turn;
            }
            state.game = gameCopy;
            state.botPlacement = winTile ? winTile : idxOfTile;
        }
    }
})

export const { grid, checkWinner, reset, whoseTurn, bot } = winnerSlice.actions;
export default winnerSlice.reducer;