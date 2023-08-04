

export function resetGame(gameVariables, canvas) {
    gameVariables.character.model = null;
    gameVariables.projectiles = [];
    gameVariables.enemies = [];
    gameVariables.loots = [];
    gameVariables.character.keyPresses = {
        z: false,
        q: false,
        s: false,
        d: false,
    };
    gameVariables.playerLevel = {
        cap: 200,
        currentXp: 0,
        currentLevel: 1
    };
    gameVariables.playerHealth = {
        cap: 100,
        maxHealth: 100,
        currentHealth: 100
    }
    gameVariables.character.attack = 10;
    gameVariables.character.armor = 0;
    gameVariables.isLooping = false;
    gameVariables.intervalInstances.forEach((interval) => {
        clearInterval(interval);
    });
    gameVariables.intervalInstances.length = 0;
}

