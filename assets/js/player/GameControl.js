import GameEnv from './GameEnv.js';
import Player from './Player.js';

let player;

const GameControl = {
    init: function() {
        console.log("Game initialized");
        GameEnv.setCanvas();
        GameEnv.initialize();
    },

    start: function() {
        player = new Player();
        GameControl.gameLoop();
    },

    gameLoop: function() {
        GameEnv.ctx.clearRect(0, 0, GameEnv.canvas.width, GameEnv.canvas.height);
        player.update(GameEnv.ctx);
        requestAnimationFrame(GameControl.gameLoop);
    },

    resize: function() {
        GameEnv.resize();
    }
};

export default GameControl;