import { FreeCamera, Scene, TargetCamera, Vector3, WebXRDefaultExperience } from '@babylonjs/core';
import Game from '../Game';

/**
 * Manages the cameras within a BabylonJS Scene, including switching
 * between different camera modes such as PC, VR, and Debug modes.
 */
class CameraManager {
    private _scene: Scene;
    private _xr: WebXRDefaultExperience;
    private _vrIsEnabled: boolean;
    private _currentCamera: FreeCamera;
    private _pcCamera: FreeCamera;
    private _debugCamera: FreeCamera;
    private _debugModeEnabled: boolean = false;
    private _continuePressed: boolean = false;

    /**
     * Initializes the camera manager with scene and VR mode settings.
     * Sets up PC and Debug cameras.
     *
     * @param {Scene} scene - The BabylonJS scene.
     * @param {boolean} vrIsEnabled - Flag to indicate if VR is enabled.
     */
    public constructor(xr: WebXRDefaultExperience, vrIsEnabled: boolean) {
        this._scene = Game.instance.scene;
        this._xr = xr;
        this._vrIsEnabled = vrIsEnabled;

        this._pcCamera = new FreeCamera('pcCamera', Vector3.Zero(), this._scene);
        // Move with zqsd
        this._pcCamera.keysUp = [90]; // Z
        this._pcCamera.keysDown = [83]; // S
        this._pcCamera.keysLeft = [81]; // Q
        this._pcCamera.keysRight = [68]; // D
        this._pcCamera.attachControl();
        this._pcCamera.position = new Vector3(0, 3, -5);
        this._pcCamera.setTarget(Vector3.Zero());
        this._currentCamera = this._pcCamera;

        this._debugCamera = new FreeCamera('debugCamera', Vector3.Zero(), this._scene);
        this._scene.activeCamera = this._currentCamera;
    }

    /**
     * Switches the active camera to the specified camera.
     * Detaches controls from the current camera and attaches them to the new one.
     *
     * @param {FreeCamera} newCamera - The camera to switch to.
     */
    private _switchCamera(newCamera: FreeCamera): void {
        this._currentCamera.detachControl();
        this._currentCamera = newCamera;
        this._currentCamera.attachControl();
        this._scene.activeCamera = this._currentCamera;
    }

    /**
     * Updates the camera manager state, handling camera switching based on input.
     * If VR is not enabled, listens for a specific input to toggle debug mode.
     */
    public update(): void {
        if (this._vrIsEnabled) {
            return;
        }

        const secondaryPressed = Game.instance.inputManager.leftSecondary.pressed;
        if (secondaryPressed && !this._continuePressed) {
            this._continuePressed = true;
            this._debugModeEnabled = !this._debugModeEnabled;
            this._switchCamera(this._debugModeEnabled ? this._debugCamera : this._pcCamera);
        } else if (!secondaryPressed) {
            this._continuePressed = false;
        }
    }

    /**
     * Gets the active camera, which is the VR camera if VR is enabled, or the PC camera otherwise (no debug camera).
     * @returns {Camera} The active camera, no debug camera.
     */
    public get playerCamera(): TargetCamera {
        return this._vrIsEnabled ? this._xr.baseExperience.camera : this._pcCamera;
    }
}

export default CameraManager;
