import GameEnv from './GameEnv.js';
import Player from './Player.js';

GameEnv.setCanvas();
let player = new Player();

let keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
};

const GameControl = {
    // Initialize the game
    init: function() {
        console.log("Game initialized");
        GameEnv.initialize();
    },

    // Start the game
    start: function() {
        console.log("Game started");
        requestAnimationFrame(GameControl.start); // Correctly call the start method
        GameEnv.ctx.clearRect(0, 0, canvas.width, canvas.height);
        player.update(GameEnv.ctx);
        if (keys.right.pressed && player.position.x + player.width <= canvas.width - 50) {
            player.velocity.x = 15;
        } else if (keys.left.pressed && player.position.x >= 50) {
            player.velocity.x = -15;
        } else {
            player.velocity.x = 0;
        }
    },
};

// Event listener for keydown events
addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            console.log('left');
            keys.left.pressed = true;
            break;
        case 83:
            console.log('down');
            break;
        case 68:
            console.log('right');
            keys.right.pressed = true;
            break;
        case 87:
            console.log('up');
            player.velocity.y -= 20;
            break;
    }
});
// Event listener for keyup events
addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            console.log('left');
            keys.left.pressed = false;
            break;
        case 83:
            console.log('down');
            break;
        case 68:
            console.log('right');
            keys.right.pressed = false;
            break;
        case 87:
            console.log('up');
            player.velocity.y = -20;
            break;
    }
});

export default GameControl;