export interface Game {
    grid: {
        game: String[]
        win: String | null
        resetGame: boolean
        turn: null | string
        botPlacement: null | number
    }
}