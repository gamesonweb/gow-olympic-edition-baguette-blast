import { Axis, Mesh, MeshBuilder, Scene, Space, Vector3 } from '@babylonjs/core';
import { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture';
import { Rectangle } from '@babylonjs/gui/2D/controls/rectangle';
import { TextBlock } from '@babylonjs/gui/2D/controls/textBlock';
import Game from '../game/Game';
import InputManager from '../inputs/InputManager';

/**
 * Class representing a debug console within a Babylon.js scene.
 * It creates a panel in the 3D scene for displaying debug information.
 */
export default class DebugConsole {
    private _log: string;
    private _plane: Mesh;
    private _debugPanel: TextBlock;
    private _scene: Scene;
    private _inputManager: InputManager;
    private _scorePanel: TextBlock;

    /**
     * Constructor for the DebugConsole class.
     * @param {Scene} scene - The Babylon.js scene where the debug console will be displayed.
     */
    constructor() {
        this._scene = Game.instance.scene;
        this._log = '';
        this._initializeDebugPanel();
        this._inputManager = Game.instance.inputManager;
    }

    /**
     * Initializes the debug panel in the 3D scene.
     * This involves creating a plane to serve as the panel and setting up the text display.
     */
    private _initializeDebugPanel(): void {
        // Create a plane for the debug panel
        this._plane = MeshBuilder.CreatePlane('debugPanel', { width: 1, height: 0.25 }, this._scene);
        this._plane.isVisible = false;
    
        // Setting up the advanced texture
        const advancedTexture = AdvancedDynamicTexture.CreateForMesh(this._plane, 1024, 256, true);
    
        // Configuring the debug panel's rectangle
        const debugPanel = new Rectangle('debugPanel');
        debugPanel.width = 0.5;
        debugPanel.height = '200px';
        debugPanel.color = 'white';
        debugPanel.thickness = 4;
        debugPanel.background = 'black';
        debugPanel.alpha = 0.5;
        debugPanel.isHitTestVisible = false;
        advancedTexture.addControl(debugPanel);
    
        // Configuring the TextBlock for displaying information
        this._debugPanel = new TextBlock();
        this._debugPanel.color = 'white';
        this._debugPanel.fontSize = 24;
        debugPanel.addControl(this._debugPanel);
    
        // Adding a TextBlock for Score
        this._scorePanel = new TextBlock();
        this._scorePanel.color = 'yellow'; // Making score color distinct
        this._scorePanel.fontSize = 24;
        this._scorePanel.text = 'Score: 0'; // Initial score
        debugPanel.addControl(this._scorePanel);
    }
    
    // Method to update score
    public updateScore(score: number): void {
        if (this._scorePanel) {
            this._scorePanel.text = `Score: ${score}`;
        }
    }
    
    /**
     * Returns a string containing the current input state.
     * @returns {string} A string containing the current input state.
     */
    private _inputController(): string {
        let result = '';
        const inputManager = Game.instance.inputManager;

        if (inputManager.leftTrigger.pressed) {
            result += 'Left Trigger Pressed value: ' + inputManager.leftTrigger.value + '\n';
        }

        if (inputManager.rightTrigger.pressed) {
            result += 'Right Trigger Pressed value: ' + inputManager.rightTrigger.value + '\n';
        }

        if (inputManager.leftGrip.pressed) {
            result += 'Left Grip Pressed value: ' + inputManager.leftGrip.value + '\n';
        }

        if (inputManager.rightGrip.pressed) {
            result += 'Right Grip Pressed value: ' + inputManager.rightGrip.value + '\n';
        }

        if (inputManager.leftPrimary.pressed) {
            result += 'Left Primary Pressed\n';
        }

        if (inputManager.rightPrimary.pressed) {
            result += 'Right Primary Pressed\n';
        }

        if (inputManager.leftSecondary.pressed) {
            result += 'Left Secondary Pressed\n';
        }

        if (inputManager.rightSecondary.pressed) {
            result += 'Right Secondary Pressed\n';
        }

        if (inputManager.leftThumbstick.pressed) {
            result +=
                'Left Thumbstick Pressed x: ' +
                inputManager.leftThumbstick.x +
                ' y: ' +
                inputManager.leftThumbstick.y +
                '\n';
        }

        if (inputManager.rightThumbstick.pressed) {
            result +=
                'Right Thumbstick Pressed x: ' +
                inputManager.rightThumbstick.x +
                ' y: ' +
                inputManager.rightThumbstick.y +
                '\n';
        }

        return result;
    }

    /**
     * Updates the debug panel with new information.
     * @param {string} fps - The current frames per second to display.
     */
    public update(fps: string): void {
        this._toggleDebug();

        if (!this._plane.isVisible) {
            return;
        }

        this._debugPanel.text = `Debug Info\n${fps}\n${this._inputController()}\n${this._log}`;

        // Update the position of the debug panel
        const camera = this._scene.activeCamera;
        const cameraPosition = camera.position;
        const forward = new Vector3(0, -0.2, 1);
        this._plane.position = cameraPosition.add(camera.getDirection(forward).scale(2));

        // Rotate the panel to face the camera
        this._plane.lookAt(cameraPosition);
        this._plane.rotate(Axis.Y, Math.PI, Space.LOCAL);
    }

    /**
     * Tracks whether the left primary button is pressed.
     */
    private _continuePressed: boolean = false;

    /**
     * Toggles the debug panel's visibility when the left primary button is pressed.
     */
    private _toggleDebug(): void {

        const primaryPressed: boolean = this._inputManager.rightGrip.pressed;
        const isVisible : boolean = this._plane.isVisible;

        if (primaryPressed && !this._continuePressed) {
            this._plane.isVisible = !isVisible;
        }

        this._continuePressed = primaryPressed;
    }

    /**
     * Logs a message to the debug panel.
     * @param {string} message - The message to log.
     */
    public log(message: string): void {
        this._log = message + '\n';
    }
}
