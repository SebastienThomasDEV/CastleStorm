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
        sprites: {
            up: null,
            upLeft: null,
            upRight: null,
            down: null,
            downLeft: null,
            downRight: null,
            left: null,
            right: null,
        },
        isHit: false,
        isMoving: false,
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

export const spritesPath = [
    "assets/img/character/up/Character_Up.png",
    "assets/img/character/up/Character_UpLeft.png",
    "assets/img/character/up/Character_UpRight.png",
    "assets/img/character/down/Character_Down.png",
    "assets/img/character/down/Character_DownLeft.png",
    "assets/img/character/down/Character_DownRight.png",
    "assets/img/character/left/Character_Left.png",
    "assets/img/character/right/Character_Right.png",
];