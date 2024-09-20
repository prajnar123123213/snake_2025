// Define the Player class
class Player {
    constructor() {
        // Initialize player properties
        this.position = { x: 0, y: 0 };
        this.velocity = { x: 0, y: 0 };
        this.width = 50;
        this.height = 50;
    }

    draw(ctx) {
        // Ensure ctx is passed as an argument
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(ctx) {
        this.draw(ctx);
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

export default Player;