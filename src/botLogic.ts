import { winConditions } from "./winCondition";

export const botChoice = ( gameGrid: String[] ) => {
    const gameCopy = [ ...gameGrid ];
    const checkHumanWin = checkHumanTileWin(gameCopy);
    const checkCpuWin = checkBotTileWin(gameCopy);

    if (!gameCopy.includes('O')) {
        return cpuStartingTile(gameCopy)
    }

    if (checkHumanWin === null && checkCpuWin === null) {
        const cpuTile = cpuChooseTile(gameCopy);
        if (cpuTile) {
            return cpuTile;
        } else {
            // if theres no return from cpuTile the bot will then choose the last tile available to end the game
            return cpuStartingTile(gameCopy);
        }
    } 
    else if (checkHumanWin !== null && checkCpuWin === null) {
        return checkHumanWin;
    } 
    else {
        return checkCpuWin;
    }
    

}

// look into this function be reusable for both X && O
const checkHumanTileWin = ( currentGrid: String[] ) => {
    const humanWinPotential = new Map();
    for (let idx=0; idx<winConditions.length; idx++) {
        for (let sndIdx=0; sndIdx<winConditions[idx].length; sndIdx++) {
            // If the bot has a tile in this winning set we clear the map
            if (currentGrid[winConditions[idx][sndIdx]] === 'O') {
                humanWinPotential.clear();
                break;
            }
            // If theres an empty spot we set the empty spot to the map with the
            // win condition index
            if (currentGrid[winConditions[idx][sndIdx]] === '') {
                humanWinPotential.set(winConditions[idx][sndIdx], 'empty');
            }
        }
        // The size of map is greater than 1 we then know the spot is not winnable yet
        // so we can ignore this win condition
        if (humanWinPotential.size > 1 || humanWinPotential.size === 0) { 
            humanWinPotential.clear();
        } else {
            return humanWinPotential.keys().next().value;
        }    
    }
    return null;
}

const checkBotTileWin = ( currentGrid: String[] ) => {
    const cpuWinPotential = new Map();
    for (let idx=0; idx<winConditions.length; idx++) {
        for (let sndIdx=0; sndIdx<winConditions[idx].length; sndIdx++) {
            // If the bot has a tile in this winning set we clear the map
            if (currentGrid[winConditions[idx][sndIdx]] === 'X') {
                cpuWinPotential.clear();
                break;
            }
            // If theres an empty spot we set the empty spot to the map with the
            // win condition index
            if (currentGrid[winConditions[idx][sndIdx]] === '') {
                cpuWinPotential.set(winConditions[idx][sndIdx], 'empty');
            }
        }
        // The size of map is greater than 1 we then know the spot is not winnable yet
        // so we can ignore this win condition
        if (cpuWinPotential.size > 1 || cpuWinPotential.size === 0) { 
            cpuWinPotential.clear();
        } else {
            return cpuWinPotential.keys().next().value;
        } 
    }
    return null;
}

const cpuStartingTile = ( currentGrid: String[] ): number => {
        const randomTile = Math.floor(Math.random() * currentGrid.length);
        if (currentGrid[randomTile] !== '') {
           return cpuStartingTile(currentGrid);
        }
    return randomTile;
}

const cpuChooseTile = (currentGrid: String[], humanWin?: number, cpuWin?: number) => {
    const chosenTile = new Map();

    if (!humanWin && !cpuWin) {
        for (let idx=0; idx<winConditions.length; idx++) {
            for ( let sndIdx=0; sndIdx<winConditions[idx].length; sndIdx++) {
                if (currentGrid[winConditions[idx][sndIdx]] === 'O') {
                    chosenTile.set(winConditions[idx][sndIdx], 'O');
                } else if (currentGrid[winConditions[idx][sndIdx]] === 'X') {
                    chosenTile.clear();
                    break;
                } else {
                    chosenTile.set('empty', winConditions[idx][sndIdx]);
                }
            }
            if (chosenTile.size > 1) {
                return chosenTile.get('empty')
            };
        }
    } 
}