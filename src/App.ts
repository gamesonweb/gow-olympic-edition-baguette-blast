import '@babylonjs/inspector';
import Game from './game/Game';


/**
 * Initializes the canvas for the game.
 * @returns {HTMLCanvasElement} The canvas element.
 */
function _initCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.id = 'gameCanvas';
    document.body.appendChild(canvas);
    return canvas;
}

// Initialize the game
Game.buildInstance(_initCanvas());
