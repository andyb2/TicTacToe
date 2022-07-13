export interface Game {
    grid: {
        game: string[]
        victory: {
            win: string | null
            winningSet: number[]
        }
        resetGame: boolean
        turn: null | string
        botPlacement: null | number
        scoreboard: {
            'X': number
            'O': number
            'T': number
        }
        gameCounter: number
    }
}
