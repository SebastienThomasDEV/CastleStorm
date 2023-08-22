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
        statistics: {
            level: {
                xp: 0,
                cap: 200,
                current: 1
            },
            health: {
                max: 100,
                current: 100
            },
            armor: 0,
            attack: 10,
            speed: 5,
        },
        model: null,
        money: 0,
        attack: 10,
        armor: 0,
        inputs: {
            z: false,
            q: false,
            s: false,
            d: false,
            click: true,
        },
        isHit: false,
        isMoving: false,
    },
    projectiles: [],
    enemyProjectiles: [],
    enemies: [],
    loots: {
        sprites: {
            potion: null,
            money: {
                coin: null,
                pile: null,
                bag: null
            }
        },
        instances: []
    },
    gui: {
        playerStats: null,
    },
    intervalInstances: [],
    mousePos: {
        x: 0,
        y: 0
    }
}

export const characterSprites = [
    "assets/img/character/up/Character_Up.png",
    "assets/img/character/up/Character_UpLeft.png",
    "assets/img/character/up/Character_UpRight.png",
    "assets/img/character/down/Character_Down.png",
    "assets/img/character/down/Character_DownLeft.png",
    "assets/img/character/down/Character_DownRight.png",
    "assets/img/character/left/Character_Left.png",
    "assets/img/character/right/Character_Right.png",
];

export const lootSprites = [
    "assets/img/loots/health/potion.png",
    "assets/img/loots/money/coin.png",
    "assets/img/loots/money/pile.png",
    "assets/img/loots/money/bag.png",
]

export const uiSprites = [
    "assets/img/gui/gui.png",
]