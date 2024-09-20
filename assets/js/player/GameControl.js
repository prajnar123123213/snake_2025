import GameEnv from './GameEnv.js';
import Player from './Player.js';

let keys = {
    right: { pressed: false },
    left: { pressed: false }
};

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
        if (keys.right.pressed && player.position.x + player.width <= GameEnv.canvas.width - 50) {
            player.velocity.x = 15;
        } else if (keys.left.pressed && player.position.x >= 50) {
            player.velocity.x = -15;
        } else {
            player.velocity.x = 0;
        }
        requestAnimationFrame(GameControl.gameLoop);
    },

    resize: function() {
        GameEnv.resize();
    }
};

addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 65: // 'A' key
            keys.left.pressed = true;
            break;
        case 68: // 'D' key
            keys.right.pressed = true;
            break;
        case 87: // 'W' key
            player.velocity.y -= 20;
            break;
        case 83: // 'S' key
            player.velocity.y += 20;
            break;
    }
});

addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 65: // 'A' key
            keys.left.pressed = false;
            break;
        case 68: // 'D' key
            keys.right.pressed = false;
            break;
        case 87: // 'W' key
            player.velocity.y = 0;
            break;
        case 83: // 'S' key
            player.velocity.y = 0;
            break;
    }
});

export default GameControl;