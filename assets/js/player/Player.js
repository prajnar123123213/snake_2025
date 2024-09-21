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
 * @property {Object} scale - The scale of the player based on the game environment.
 * @property {number} size - The size of the player.
 * @property {number} width - The width of the player.
 * @property {number} height - The height of the player.
 * @property {number} xVelocity - The velocity of the player along the x-axis.
 * @property {number} yVelocity - The velocity of the player along the y-axis.
 * @property {number} scaleFactor - The factor used to determine the player's size relative to the game environment.
 * @property {number} stepFactor - The factor used to determine the player's velocity steps relative to the game environment.
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
        // Size the player's object
        this.scaleFactor = 25; // 1/25th of height of canvas
        this.scale = {width: GameEnv.innerWidth, height: GameEnv.innerHeight};
        this.size = GameEnv.innerHeight / this.scaleFactor;
        // Keep track of the player's position and velocity
        this.position = { x: 0, y: GameEnv.innerHeight - this.size }; 
        this.velocity = { x: 0, y: 0 };
        this.stepFactor = 100; // 1/100th, or 100 steps up and across the canvas
        // Size the player's object
        this.resize(); // reusable code
        // Bind event listeners to allow object movement
        this.bindEventListeners();
    }

    resize() { 
        // Calculate the new scale resulting from the window resize
        const newScale = { width: GameEnv.innerWidth, height: GameEnv.innerHeight };
        
        // Player's new position formula: newPos = (oldPos / oldScale) * newScale
        this.position.x = (this.position.x / this.scale.width) * newScale.width;
        this.position.y = (this.position.y / this.scale.height) * newScale.height;
        
        // Switch Player's scale to the new scale
        this.scale = newScale;
        
        // Recalculate the player's object extents
        this.size =  this.scale.height / this.scaleFactor;
        // Velocity steps are 1/100th of the width and height of the canvas  
        this.xVelocity = this.scale.width / this.stepFactor; 
        this.yVelocity = this.scale.height / this.stepFactor; 
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