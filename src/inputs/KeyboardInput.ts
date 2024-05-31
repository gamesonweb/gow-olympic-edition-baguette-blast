import { Scene, Vector3 } from '@babylonjs/core';
import Game from '../game/Game';
import InputManager from './InputManager';

/**
 * Class representing the input system for the keyboard.
 * It sets up event listeners for keyboard events and updates the input manager based on the key states.
 */
class KeyboardInput extends InputManager {
    /**
     * Initializes a new instance of the KeyboardInput class.
     */
    public constructor(scene: Scene) {
        super(scene);
        this._initializeKeyboardInput();
    }

    /**
     * Sets up listeners for keydown and keyup events.
     */
    private _initializeKeyboardInput(): void {
        window.addEventListener('keydown', (event) => {
            this._updateInputDownActions(event);
        });

        window.addEventListener('keyup', (event) => {
            this._updateInputUpActions(event);
        });

        // Attach anchor to simulate controller in front of the user.
        const camera = Game.instance.cameraManager.playerCamera;

        this._leftAnchor.parent = camera;
        this._leftAnchor.position = new Vector3(-0.5, -0.3, 1.5);
        this._leftAnchor.rotation = new Vector3(0, 0, 0);
        
        this._rightAnchor.parent = camera;
        this._rightAnchor.position = new Vector3(0.5, -0.3, 1.5);
        this._rightAnchor.rotation = new Vector3(0, 0, 0);
    }

    /**
     * Updates the input manager based on the key down states.
     * @param event The keyboard event.
     */
    private _updateInputDownActions(event: KeyboardEvent): void {
        // Handling 'w', 'a', 's', 'd' for left thumbstick
        let x = 0,
            y = 0;
        if (event.key === 'w') x = 1;
        if (event.key === 's') x = -1;
        if (event.key === 'a') y = -1;
        if (event.key === 'd') y = 1;
        if (x !== 0 || y !== 0) this.setThumbstick('left', true, x, y);

        // Handling Arrow keys for right thumbstick
        x = 0;
        y = 0;
        if (event.key === 'ArrowUp') y = 1;
        if (event.key === 'ArrowDown') y = -1;
        if (event.key === 'ArrowLeft') x = -1;
        if (event.key === 'ArrowRight') x = 1;
        if (x !== 0 || y !== 0) this.setThumbstick('right', true, x, y);

        // Handling other keys
        if (event.key === ' ') this.setPrimary('left', true);

        if (event.key === 'b') this.setPrimary('right', true);
        if (event.key === 'n') this.setSecondary('left', true);

        if (event.key === 'Control') this.setSecondary('right', true);
        if (event.key === 'q') this.setGrip('left', true, 1);
        if (event.key === 'e') this.setGrip('right', true, 1);
        if (event.key === ' ') this.setTrigger('left', true, 1);
        if (event.key === 'Enter') this.setTrigger('right', true, 1);
    }

    /**
     * Updates the input manager based on the key up states.
     * @param event The keyboard event.
     */
    private _updateInputUpActions(event: KeyboardEvent): void {
        // Handling 'w', 'a', 's', 'd' for left thumbstick
        if (event.key === 'w' || event.key === 's' || event.key === 'a' || event.key === 'd') {
            this.setThumbstick('left', false, 0, 0);
        }

        // Handling Arrow keys for right thumbstick
        if (
            event.key === 'ArrowUp' ||
            event.key === 'ArrowDown' ||
            event.key === 'ArrowLeft' ||
            event.key === 'ArrowRight'
        ) {
            this.setThumbstick('right', false, 0, 0);
        }

        // Handling other keys
        if (event.key === ' ') this.setPrimary('left', false);

        if (event.key === 'b') this.setPrimary('right', false);
        if (event.key === 'n') this.setSecondary('left', false);

        if (event.key === 'Control') this.setSecondary('right', false);
        if (event.key === 'q') this.setGrip('left', false, 0);
        if (event.key === 'e') this.setGrip('right', false, 0);
        if (event.key === ' ') this.setTrigger('left', false, 0);
        if (event.key === 'Enter') this.setTrigger('right', false, 0);
    }

    public setControllerVisibility(visible: boolean, controllerSide: 'left' | 'right' | 'both'): void {
        // No-op
        visible;
        controllerSide;
    }

    public vibrateController(
        handedness: 'left' | 'right' | 'both',
        intensity: number,
        duration: number,
        timeout: number
    ): void {
        // No-op
        handedness;
        intensity;
        duration;
        timeout;
    }
}

export default KeyboardInput;
