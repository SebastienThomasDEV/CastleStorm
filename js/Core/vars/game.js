export const game =  {
    isLooping: false,
    playerLevel: {
        cap: 200,
        currentXp: 0,
        currentLevel: 1
    },
    playerHealth: {
        maxHealth: 100,
        currentHealth: 100
    },
    character : {
        model: null,
        money: 0,
        attack: 10,
        armor: 0,
        inputs: {
            z: false,
            q: false,
            s: false,
            d: false,
        },
        sprites: {},
        isHit: false,
    },
    projectiles: [],
    enemies: [],
    loots: [],
    intervalInstances: [],
    mousePos: {
        x: 0,
        y: 0
    }
}