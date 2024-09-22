import GameEnv from './GameEnv.js';

export class Background  {
    constructor(imageSrc) {
       this.image = new Image();
       this.image.src = imageSrc;
    }

    /* To draws are used to capture primary frame and wrap around ot next frame
     * x to y is primary draw
     * x + width to y is wrap around draw
    */
    draw() {
        const ctx = GameEnv.ctx;
        const width = GameEnv.innerWidth;
        const height = GameEnv.innerHeight;

        // Draw the background image scaled to the canvas size
        ctx.drawImage(this.image, 0, 0, width, height);
    }
}

export default Background;