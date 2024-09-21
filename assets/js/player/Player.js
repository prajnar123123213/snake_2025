import GameEnv from './GameEnv.js';

class Player {
    constructor() {
        // Initialize player properties
        this.size = 50;
        this.xVelocity = 15;
        this.yVelocity = 10;
        this.position = { x: GameEnv.innerWidth / 2, y: GameEnv.innerHeight - this.size };
        this.velocity = { x: 0, y: 0 };
        this.width = this.size;
        this.height = this.size;
        this.keys = {
            right: { pressed: false },
            left: { pressed: false }
        };

        // Bind event listeners
        this.bindEventListeners();
    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(ctx) {
        this.draw(ctx);

        // Update position with velocity
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Ensure the player stays within the canvas boundaries
        if (this.position.y + this.height > GameEnv.innerHeight) {
            this.position.y = GameEnv.innerHeight - this.height;
            this.velocity.y = 0;
        }

        if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity.y = 0;
        }

        if (this.position.x + this.width > GameEnv.innerWidth) {
            this.position.x = GameEnv.innerWidth - this.width;
            this.velocity.x = 0;
        }

        if (this.position.x < 0) {
            this.position.x = 0;
            this.velocity.x = 0;
        }

        // Handle horizontal movement
        if (this.keys.right.pressed && this.position.x + this.width <= GameEnv.innerWidth - this.size) {
            this.velocity.x = this.xVelocity;
        } else if (this.keys.left.pressed && this.position.x >= this.size) {
            this.velocity.x = -this.xVelocity;
        } else {
            this.velocity.x = 0;
        }
    }

    /* These event listeners are used to handle player movement
        * The key events perform callbacks to handle player movement
        * The .bind(this) method ensures it refers to the Player class
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
                this.keys.left.pressed = true;
                break;
            case 83: // 'S' key
                this.velocity.y += this.yVelocity;
                break;
            case 68: // 'D' key
                this.keys.right.pressed = true;
                break;
        }
    }

    handleKeyUp({ keyCode }) {
        switch (keyCode) {
            case 87: // 'W' key
                this.velocity.y = 0;
                break;
            case 65: // 'A' key
                this.keys.left.pressed = false;
                break;
            case 83: // 'S' key
                this.velocity.y = 0;
                break;
            case 68: // 'D' key
                this.keys.right.pressed = false;
                break;
        }
    }
}

export default Player;