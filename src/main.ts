import {Game} from "./vendor/Game";

window.onload = () => {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas)
    const game = new Game(canvas);
    game.loop()
}