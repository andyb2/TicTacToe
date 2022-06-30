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
        reset: (state) => {
            const emptyBoard = [
                '', '', '',
                '', '', '',
                '', '', '',
            ];
            state.resetGame = true;
            state.game = emptyBoard;
            state.win = null;
            state.turn = '';
        },
        bot: (state) => {
            const gameCopy = [...state.game]
            console.log(`TURN`, state.turn)
            let otherPlayer = 0;
            let idxOfTile: number | null = null;
        
            for (let i=0; i<winConditions.length; i++) {
                for (let j=0; j<winConditions[i].length; j++) {
                    if (otherPlayer === 2) {
                        idxOfTile = winConditions[i][j-1]  
                    }
                    if (gameCopy[winConditions[i][j]] !== state.turn && gameCopy[winConditions[i][j]] === 'O') {
                        otherPlayer++;
                    }
                }
            }
            if (!idxOfTile) {
            for (let i=0; i<gameCopy.length; i++) {
                    if (gameCopy[i] !== 'X') {
                        idxOfTile = i
                    }
                }
            }
            
            if (idxOfTile) {
                gameCopy[idxOfTile] = state.turn;
            }
            
            state.game = gameCopy;
            state.botPlacement = idxOfTile;
        }
    }
})

export const { grid, checkWinner, reset, whoseTurn, bot } = winnerSlice.actions;
export default winnerSlice.reducer;