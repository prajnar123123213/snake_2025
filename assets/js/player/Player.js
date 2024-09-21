import GameEnv from './GameEnv.js';

/**
 * Player is a dynamic class that manages the data and events for a player object.
 * 
 * The focus of this class is to handle the player's state, rendering, and key events.
 * 
 * This class uses a more classic Java technique by employing a class pattern.
 * 
 * @class Player
 * @property {Object} position - The current position of the player.
 * @property {Object} velocity - The current velocity of the player.
 * @property {number} size - The size of the player.
 * @property {number} width - The width of the player.
 * @property {number} height - The height of the player.
 * @property {number} xVelocity - The velocity of the player along the x-axis.
 * @property {number} yVelocity - The velocity of the player along the y-axis.
 * @method resize - Resizes the player based on the game environment.
 * @method draw - Draws the player on the canvas.
 * @method update - Updates the player's position and ensures it stays within the canvas boundaries.
 * @method bindEventListeners - Binds key event listeners to handle player movement.
 * @method handleKeyDown - Handles key down events to change the player's velocity.
 * @method handleKeyUp - Handles key up events to stop the player's velocity.
 */
class Player {
    /**
     * The constructor method is called when a new Player object is created
     */
    constructor() {
        // Size the player object
        this.resize();
        // Keep track of the player's position and velocity
        this.position = { x: 0, y: GameEnv.innerHeight - this.size }; 
        this.velocity = { x: 0, y: 0 };
        // Bind event listeners to allow object movement
        this.bindEventListeners();
    }

    resize() { 
        // Object is scaled to 1/25th of the height of the canvas
        this.size = GameEnv.innerHeight / 25;
        // Velocity steps are 1/100th of the width and height of the canvas  
        this.xVelocity = GameEnv.innerWidth / 100;
        this.yVelocity = GameEnv.innerHeight / 100;
        // Object is a square
        this.width = this.size;
        this.height = this.size;
    }

    draw() {
        // Player object is a red square
        GameEnv.ctx.fillStyle = 'red';
        GameEnv.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        // Update begins by drawing the player object
        this.draw();

        // Update or change position according to velocity events
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Ensure the player stays within the canvas boundaries
        // Bottom of the canvas
        if (this.position.y + this.height > GameEnv.innerHeight) {
            this.position.y = GameEnv.innerHeight - this.height;
            this.velocity.y = 0;
        }
        // Top of the canvas
        if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity.y = 0;
        }
        // Right of the canvas
        if (this.position.x + this.width > GameEnv.innerWidth) {
            this.position.x = GameEnv.innerWidth - this.width;
            this.velocity.x = 0;
        }
        // Left of the canvas
        if (this.position.x < 0) {
            this.position.x = 0;
            this.velocity.x = 0;
        }
    }

    /* These event listeners are used to handle player movement
        * The key events perform callbacks to handle player movement
        * The .bind(this) method ensures it refers to the player object
    */
    bindEventListeners() {
        addEventListener('keydown', this.handleKeyDown.bind(this));
        addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    handleKeyDown({ keyCode }) {
        switch (keyCode) {
            case 87: // 'W' key
                this.velocity.y -= this.yVelocity;
                break;
            case 65: // 'A' key
                this.velocity.x -= this.xVelocity;
                break;
            case 83: // 'S' key
                this.velocity.y += this.yVelocity;
                break;
            case 68: // 'D' key
                this.velocity.x += this.xVelocity;
                break;
        }
    }

    handleKeyUp({ keyCode }) {
        switch (keyCode) {
            case 87: // 'W' key
                this.velocity.y = 0;
                break;
            case 65: // 'A' key
                this.velocity.x = 0;
                break;
            case 83: // 'S' key
                this.velocity.y = 0;
                break;
            case 68: // 'D' key
                this.velocity.x = 0;
                break;
        }
    }
}

export default Player;