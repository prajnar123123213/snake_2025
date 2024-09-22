import GameEnv from './GameEnv.js';

// Define SCALE_FACTOR and STEP_FACTOR as non-mutable constants
const SCALE_FACTOR = 25; // 1/25th of the height of the canvas
const STEP_FACTOR = 100; // 1/100th, or 100 steps up and across the canvas

/**
 * Player is a dynamic class that manages the data and events for a player object.
 * 
 * The focus of this class is to handle the player's state, rendering, and key events.
 * 
 * This class uses a classic Java class pattern which is nice for managing object data and events.
 * 
 * The classic Java class pattern provides a structured way to define the properties and methods
 * associated with the player. This approach helps encapsulate the player's state and behavior,
 * making the code more modular and easier to maintain. By using this pattern, we can create
 * multiple instances of the Player class, each with its own state and behavior.
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
 * @method resize - Resizes the player based on the game environment.
 * @method draw - Draws the player on the canvas.
 * @method update - Updates the player's position and ensures it stays within the canvas boundaries.
 * @method bindEventListeners - Binds key event listeners to handle player movement.
 * @method handleKeyDown - Handles key down events to change the player's velocity.
 * @method handleKeyUp - Handles key up events to stop the player's velocity.
 */
class Player {
    /**
     * The constructor method is called when a new Player object is created.
     */
    constructor() {
        // Initialize the player's scale based on the game environment
        this.scale = { width: GameEnv.innerWidth, height: GameEnv.innerHeight };

        // Set the initial size of the player
        this.size = GameEnv.innerHeight / SCALE_FACTOR;

        // Initialize the player's position and velocity
        this.position = { x: 0, y: GameEnv.innerHeight - this.size };
        this.velocity = { x: 0, y: 0 };

        // Set the initial size and velocity of the player
        this.resize();

        // Bind event listeners to allow object movement
        this.bindEventListeners();
    }

    /**
     * Resizes the player based on the game environment.
     * 
     * This method adjusts the player's size and velocity based on the scale of the game environment.
     * It also adjusts the player's position proportionally based on the previous and current scale.
     */
    resize() {
        // Calculate the new scale resulting from the window resize
        const newScale = { width: GameEnv.innerWidth, height: GameEnv.innerHeight };

        // Adjust the player's position proportionally
        this.position.x = (this.position.x / this.scale.width) * newScale.width;
        this.position.y = (this.position.y / this.scale.height) * newScale.height;

        // Update the player's scale to the new scale
        this.scale = newScale;

        // Recalculate the player's size based on the new scale
        this.size = this.scale.height / SCALE_FACTOR;

        // Recalculate the player's velocity steps based on the new scale
        this.xVelocity = this.scale.width / STEP_FACTOR;
        this.yVelocity = this.scale.height / STEP_FACTOR;

        // Set the player's width and height to the new size (object is a square)
        this.width = this.size;
        this.height = this.size;
    }

    /**
     * Draws the player on the canvas.
     * 
     * This method renders the player as a red square on the canvas.
     */
    draw() {
        GameEnv.ctx.fillStyle = 'red';
        GameEnv.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    /**
     * Updates the player's position and ensures it stays within the canvas boundaries.
     * 
     * This method updates the player's position based on its velocity and ensures that the player
     * stays within the boundaries of the canvas.
     */
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

    /**
     * Binds key event listeners to handle player movement.
     * 
     * This method binds keydown and keyup event listeners to handle player movement.
     * The .bind(this) method ensures that 'this' refers to the player object.
     */
    bindEventListeners() {
        addEventListener('keydown', this.handleKeyDown.bind(this));
        addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    /**
     * Handles key down events to change the player's velocity.
     * 
     * This method updates the player's velocity based on the key pressed.
     * 
     * @param {Object} event - The keydown event object.
     */
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

    /**
     * Handles key up events to stop the player's velocity.
     * 
     * This method stops the player's velocity based on the key released.
     * 
     * @param {Object} event - The keyup event object.
     */
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