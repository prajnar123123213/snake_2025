export class GameEnv {
    static canvas;
    static ctx;
    static innerWidth;
    static prevInnerWidth;
    static innerHeight;
    static top;
    static bottom;
    static prevBottom;

    constructor() {
        throw new Error('GameEnv is a static class and cannot be instantiated.');
    }

    static setCanvas() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
    }

    static setTop() {
        const header = document.querySelector('header');
        this.top = header ? header.offsetHeight : 0;
    }

    static setBottom() {
        const footer = document.querySelector('footer');
        this.bottom = footer ? this.innerHeight - footer.offsetHeight : this.innerHeight;
    }

    static initialize() {
        this.innerWidth = window.innerWidth;
        this.innerHeight = window.innerHeight;
        this.setTop();
        this.setBottom();
        this.size();
    }

    static size() {
        this.canvas.width = this.innerWidth;
        this.canvas.height = this.innerHeight;
        this.canvas.style.width = `${this.innerWidth}px`;
        this.canvas.style.height = `${this.innerHeight}px`;
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = '0px';
        this.canvas.style.top = `${this.top}px`;
    }

    static resize() {
        this.initialize();
    }
}

export default GameEnv;