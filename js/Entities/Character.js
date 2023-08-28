
import Entity from "./Entity.js";

const PI = Math.PI;

export default class Character extends Entity {
    constructor(x, y, radius) {
        super(x, y, radius);
        this.targetX = this.x;
        this.targetY = this.y;
        this.speed = 5;
        this.frame = 0;
        this.sprite = 0;
        this.level = {
            xp: 0,
            cap: 200,
            current: 1
        }
        this.health = {
            max: 100,
            current: 100
        };
        this.armor = 0;
        this.attack = 10;
        this.balance = 0;
        this.fireRate = 500;
        this.isHit = false;
        this.isMoving = false;
        this.isShooting = false;

    }

    draw(context, game) {
        // context.beginPath();
        context.drawImage(this.sprite, this.frame * 32, 0, 32, 32, this.x - 32, this.y - 32, 32 * 2, 32 * 2);
        // context.closePath();

        ////////////////////////// DEBUG ////////////////////////////
        // dessin de la cible de destination du personnage (pour le debug)
        context.beginPath();
        context.arc(this.targetX, this.targetY, 5, 0, PI * 2, false);
        context.fillStyle = 'red';
        context.fill();
        context.closePath();
        // dessin de la direction du personnage en fonction de la cible (pour le debug)
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.targetX, this.targetY);
        context.strokeStyle = 'blue';
        context.stroke();
        context.closePath();
        // dessin de la ligne de tir du personnage en fonction du curseur (pour le debug) et un arc de cercle pour le curseur
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(game.mousePos.x, game.mousePos.y);
        context.strokeStyle = 'red';
        context.stroke();
        context.closePath();
        // dessin de l'arc de cercle pour le curseur de 360° (pour le debug)
        context.beginPath();
        context.arc(game.mousePos.x, game.mousePos.y, 5, 0, PI * 2, false);
        context.fillStyle = 'red';
        context.fill();
        context.closePath();



    }

    update(context, game) {
        this.updateSprite(context, game);
        this.draw(context, game);
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        if (dx !== 0 || dy !== 0) {
            const angle = Math.atan2(dy, dx);
            const velocity = {
                x: Math.cos(angle) * this.speed,
                y: Math.sin(angle) * this.speed
            }
            if (Math.abs(dx) < Math.abs(velocity.x)) {
                this.x = this.targetX;
            } else {
                this.x += velocity.x;
            }
            if (Math.abs(dy) < Math.abs(velocity.y)) {
                this.y = this.targetY;
            } else {
                this.y += velocity.y;
            }
        }
    }

    updateSprite(context, game) {
        // on doit vérifier la position du curseur par rapport au personnage pour savoir si on doit changer le sprite
        // on doit avoir 8 sprites différents pour les 8 directions possibles
        // on doit donc vérifier si le curseur est dans un des 8 angles de 45° autour du personnage
        let angle = Math.atan2(game.mousePos.y - this.y, game.mousePos.x - this.x);
        if (angle < 0) {
            angle += PI * 2;
        }
        // on a l'angle entre le personnage et le curseur
        // on doit maintenant vérifier dans quel angle de 45° on se trouve
        // on va donc vérifier si l'angle est compris entre 0 et 45°, 45° et 90°, etc...

        /** @todo Find a place for this (init time) */
        const SPRITES = [
            game.character.sprites.left,
            game.character.sprites.upLeft,
            game.character.sprites.up,
            game.character.sprites.upRight,
            game.character.sprites.right,
            game.character.sprites.downRight,
            game.character.sprites.down,
            game.character.sprites.downLeft,
        ];

        this.sprite = SPRITES[this.getAngleIndex(angle)];

        // on doit mtn vérifier si on est en train de bouger ou pas
        // si on est en train de bouger, on doit afficher l'animation de marche sinon on doit afficher l'animation d'arrêt

        if (this.targetX !== this.x || this.targetY !== this.y) {
            this.frame += 1;
            if (this.frame >= 4) {
                this.frame = 0;
            }
        } else {
            this.frame = 0;
        }

    }

    checkXp() {
        if (this.level.xp >= this.level.cap) {
            this.level.xp = 0;
            this.level.cap *= 1.5;
            this.level.current += 1;
            this.health.max += 5;
            this.attack += 1;
            this.armor += 1;
        }
    }

    gainXp(xp) {
        this.level.xp += xp;
        this.checkXp();
    }

    takeDamage(damage) {
        this.health.current -= (damage - this.armor);
        if (this.health.current <= 0) {
            this.health.current = 0;
        }
    }

    heal(heal) {
        this.health.current += heal;
        if (this.health.current > this.health.max) {
            this.health.current = this.health.max;
        }
    }

    credit(credit) {
        this.balance += credit;
    }

    shoot(game, projectileClass) {
        const angle = Math.atan2(game.mousePos.y - this.y, game.mousePos.x - this.x);
        const velocity = {
            x: Math.cos(angle) * 20,
            y: Math.sin(angle) * 20,
        }
        this.isShooting = true;
        setTimeout(() => {
            this.isShooting = false;
        }, this.fireRate);
        game.projectiles.push(new projectileClass(this.x, this.y, 5, velocity, "red"));
    }

    /**
     * @todo Refactor
     * @param {Number} angle
     * @returns {Number}
     */
    getAngleIndex(angle) {
        if (angle >= 0 && angle < PI / 8) {
           return 4;
        } else if (angle >= PI / 8 && angle < PI * 3 / 8) {
            return 5;
        } else if (angle >= PI * 3 / 8 && angle < PI * 5 / 8) {
            return 6;
        } else if (angle >= PI * 5 / 8 && angle < PI * 7 / 8) {
            return 7;
        } else if (angle >= PI * 7 / 8 && angle < PI * 9 / 8) {
           return 0;
        } else if (angle >= PI * 9 / 8 && angle < PI * 11 / 8) {
            return 1;
        } else if (angle >= PI * 11 / 8 && angle < PI * 13 / 8) {
            return 2;
        } else if (angle >= PI * 13 / 8 && angle < PI * 15 / 8) {
            return 3;
        } else if (angle >= PI * 15 / 8 && angle < PI * 2) {
            return 4;
        }
    }
}
