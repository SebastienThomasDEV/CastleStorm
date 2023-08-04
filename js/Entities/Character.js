export default class Character {
    constructor(x , y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = 5;
        this.targetX = this.x;
        this.targetY = this.y;
        this.angle = 0;
    }

    draw(context, game) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = game.character.isHit ? 'red' : 'green';
        context.fill();
        context.closePath();
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x + Math.cos(this.angle) * this.radius, this.y + Math.sin(this.angle) * this.radius);
        context.strokeStyle = 'black';
        context.stroke();
        context.closePath();
        //////////////////////////// DEBUG ////////////////////////////
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
        this.draw(context, game);
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        if (dx !== 0 || dy !== 0) {
            const angle = Math.atan2(dy, dx);
            this.angle = angle;
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




}
