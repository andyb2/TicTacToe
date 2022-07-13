import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { winConditions } from '../../winCondition';

interface GridPayload {
    idx: number
    user: string
}

interface IState {
    game: String[]
    victory: {
        win: null | string
        winningSet: number[] | null
    } 
    scoreboard: {
        [index: string]: number;
        "X": number
        "O": number
        "T": number
    }
    turn: string
    resetGame: boolean
    botPlacement: null | number
    gameCounter: number
}

const initialState: IState = {
    game: [
    '', '', '',
    '', '', '',
    '', '', '',
    ],
    victory: {
        win: null,
        winningSet: null,
    },
    scoreboard: {
        'X': 0,
        'O': 0,
        'T': 0,
    },
    turn: '',
    resetGame: false,
    botPlacement: null,
    gameCounter: 0,
}

const winnerSlice = createSlice({
    name: 'grid',
    initialState,
    reducers: {
        // The users selected tile will be applied to the game board
        playerChoice: (state, action: PayloadAction<GridPayload>) => {
            const gridCopy = [...state.game];
            gridCopy[action.payload.idx] = action.payload.user;
            state.game = gridCopy;
        },
        // payload received is from the player that chose a tile last
        // this will switch the turn to trigger the bot choosing a tile 
        whoseTurn: (state, action) => {
            const user = action.payload;
            let otherPlayer: string | null;
            user === 'X' ? otherPlayer = 'O' : otherPlayer = 'X';
            state.turn = otherPlayer;
        },
        // Checks to see if there is a winning tile set after each turn
        checkWinner: (state, action: PayloadAction<string>) => {
            const gameCopy = [...state.game];
            let win = 0;
            let winningIdx: number[] = [];
            for(let i=0; i<winConditions.length; i++) {
                for(let j=0; j<winConditions[i].length; j++) {
                    if (gameCopy[winConditions[i][j]] === action.payload) {
                        winningIdx.push(winConditions[i][j]);
                        win++;
                    }
                }
                if (win < 3) {
                    win = 0;
                    winningIdx = [];
                } else {
                    break;
                }
            }
            
            if (win === 3) {
                state.victory.winningSet = winningIdx;
                state.victory.win = action.payload;
                state.scoreboard[action.payload] = state.scoreboard[action.payload] += 1;
            } 
            const tieGme = gameCopy.filter(tile => tile !== '');
            if (tieGme.length === gameCopy.length) {
                state.victory.win = 'TIE';
                state.scoreboard['T'] = state.scoreboard['T'] += 1;
            }
        },
        // Triggering the reset will clear the state to its initial state
        reset: (state, action) => {
            if (action.payload) {
                const emptyBoard = [
                    '', '', '',
                    '', '', '',
                    '', '', '',
                ];
                state.resetGame = action.payload;
                state.game = emptyBoard;
                state.victory.win = null;
                state.victory.winningSet = null;
                state.turn = '';
                state.botPlacement = null;
            }
        },
        // Updates the game set with the bots chosen tile
        bot: (state, action) => {
            const gridCopy = [...state.game];
            gridCopy[action.payload] = 'O'; 
            state.botPlacement = action.payload;
            state.game = gridCopy;
        },
        gameNumber: (state) => {
            state.gameCounter += 1
        }
    }
})

export const { playerChoice, checkWinner, reset, whoseTurn, bot, gameNumber } = winnerSlice.actions;
export default winnerSlice.reducer;