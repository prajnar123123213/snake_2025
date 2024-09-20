/**
 * GameEnv.js key purpose is to manage shared game environment data and methods.
 * 
 * @class
 * @classdesc GameEnv is defined as a static class, this ensures that there is only one instance of the class.
 * Static classes do not have a constructor, cannot be instantiated, do not have instance variables, only singleton/static variables,
 * do not have instance methods, only singleton/static methods, is similar in namespace to an object literal, but is a class.
 * The benefit is it is similar to other coding languages (e.g. Java, C#), thus is more readable to other developers.
 * 
 * Purpose of GameEnv:
 * - stores game attributes (e.g. gravity, speed, width, height, top, bottom, etc.)
 * 
 * Usage Notes:
 * GameEnv is used by other classes to manage the game environment.  
 * It is dangerous to use GameEnv directly, it is not protected from misuse. Comments below show locations of usage.
 * Here are some methods supported by GameEnv:
 * - call GameEnv.initialize() to initialize window dimensions
 * - call GameEnv.resize() to resize game objects
 */
export class GameEnv {

    /**
     * @property {object} canvas - background canvas
     * @property {object} ctx - background canvas context
     * @property {number} innerWidth - used by platformer objects
     * @property {number} prevInnerWidth - used by platformer objects
     * @property {number} innerHeight - used by platformer objects
     * @property {number} top - used by platformer objects
     * @property {number} bottom - used by platformer objects
     * @property {number} prevBottom - used by platformer objects
     */
   
    static canvas;
    static ctx;
    static innerWidth;
    static prevInnerWidth;
    static innerHeight;
    static top;
    static bottom;
    static prevBottom;

    
    // Make the constructor throws an error, or effectively make it a private constructor.
    constructor() {
        throw new Error('GameEnv is a static class and cannot be instantiated.');
    }

    /**
     * Setter for Canvas, called by GameControl
     * @static
     */
    static setCanvas() {
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
    }
  
     /**
     * Setter for Top position
     * @static
     */
    static setTop() {
        // set top of game as header height
        const header = document.querySelector('header');
        if (header) {
            this.top = header.offsetHeight;
        } else {
            this.top = 0;
        }
    }
  
    /**
     * Setter for Bottom position
     * @static
     */
    static setBottom() {
        // sets the bottom or gravity 
        const footer = document.querySelector('footer');
        if (footer) {
            this.bottom = this.innerHeight - footer.offsetHeight
        } else {
            this.bottom = this.innerHeight;
        }
    }
  
    /**
     * Setup for Game Environment, called by transitionToLevel in GameControl
     * @static
     */
    static initialize() {
        // store previous for ratio calculations on resize
        this.prevInnerWidth = this.innerWidth;
        this.prevBottom = this.bottom;
    
        // game uses available width and height
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;
        this.setTop();
        this.setBottom();
    }
  
    /* Background canvas is set to screen sizes
    */ 
    size() {
        let canvasLeft = 0;
        this.canvas.width = this.innerWidth;
        this.canvas.height = this.innerHeight;
        this.canvas.style.width = `${this.innerWidth}px`;
        this.canvas.style.height = `${this.innerHeight}px`;
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = `${canvasLeft}px`;
        this.canvas.style.top = `${this.top}px`;

        // set bottom of game to new background height
        this.setBottom(); 
    }

    /**
     * Resize game objects, called by resize in GameControl
     * @static
     */    
    static resize() {
        this.initialize();  // Update GameEnv dimensions
        this.size();  // Resize the background canvas
    }

}
  
export default GameEnv;