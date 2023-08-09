
import Entity from "./Entity.js";
export default class Character extends Entity {
    constructor(x, y, radius) {
        super(x, y, radius);
        this.speed = 5;
        this.targetX = this.x;
        this.targetY = this.y;
        this.frame = 0;
        this.sprite = 0;
    }

    draw(context, game) {
        context.beginPath();
        context.drawImage(this.sprite, this.frame * 32, 0, 32, 32, this.x - 32, this.y - 32, 32 * 2, 32 * 2);
        context.closePath();

        ////////////////////////// DEBUG ////////////////////////////
        // dessin de la cible de destination du personnage (pour le debug)
        context.beginPath();
        context.arc(this.targetX, this.targetY, 5, 0, Math.PI * 2, false);
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
        context.arc(game.mousePos.x, game.mousePos.y, 5, 0, Math.PI * 2, false);
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
            angle += Math.PI * 2;
        }
        // on a l'angle entre le personnage et le curseur
        // on doit maintenant vérifier dans quel angle de 45° on se trouve
        // on va donc vérifier si l'angle est compris entre 0 et 45°, 45° et 90°, etc...

        if (angle >= 0 && angle < Math.PI / 8) {
            this.sprite = game.character.sprites.right;
        } else if (angle >= Math.PI / 8 && angle < Math.PI * 3 / 8) {
            this.sprite = game.character.sprites.downRight;
        } else if (angle >= Math.PI * 3 / 8 && angle < Math.PI * 5 / 8) {
            this.sprite = game.character.sprites.down;
        } else if (angle >= Math.PI * 5 / 8 && angle < Math.PI * 7 / 8) {
            this.sprite = game.character.sprites.downLeft;
        } else if (angle >= Math.PI * 7 / 8 && angle < Math.PI * 9 / 8) {
            this.sprite = game.character.sprites.left;
        } else if (angle >= Math.PI * 9 / 8 && angle < Math.PI * 11 / 8) {
            this.sprite = game.character.sprites.upLeft;
        } else if (angle >= Math.PI * 11 / 8 && angle < Math.PI * 13 / 8) {
            this.sprite = game.character.sprites.up;
        } else if (angle >= Math.PI * 13 / 8 && angle < Math.PI * 15 / 8) {
            this.sprite = game.character.sprites.upRight;
        } else if (angle >= Math.PI * 15 / 8 && angle < Math.PI * 2) {
            this.sprite = game.character.sprites.right;
        }

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




}
