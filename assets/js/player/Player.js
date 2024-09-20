import GameEnv from './GameEnv.js';

class Player {
    constructor() {
        // Initialize player properties
        this.position = { x: GameEnv.innerWidth / 2, y: GameEnv.bottom - 50 };
        this.velocity = { x: 0, y: 0 };
        this.width = 50;
        this.height = 50;
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
        if (this.position.y + this.height > GameEnv.bottom) {
            this.position.y = GameEnv.bottom - this.height;
            this.velocity.y = 0;
        }

        if (this.position.y < GameEnv.top) {
            this.position.y = GameEnv.top;
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
    }
}

export default Player;