import {
    AbstractMesh,
    Scene,
    Vector3,
    WebXRAbstractMotionController,
    WebXRControllerComponent,
    WebXRDefaultExperience,
} from '@babylonjs/core';
import InputManager from './InputManager';

/**
 * Class representing the input system for the Oculus Quest controllers.
 * It sets up button listeners for each controller component.
 */
class QuestInput extends InputManager {
    private _xr: WebXRDefaultExperience;

    private _leftController: WebXRAbstractMotionController;
    private _rightController: WebXRAbstractMotionController;

    /**
     * Initializes a new instance of the QuestInput class.
     * @param xr The WebXRDefaultExperience object.
     */
    public constructor(xr: WebXRDefaultExperience, scene: Scene) {
        super(scene);
        this._xr = xr;
        this._initializeQuestInput();
    }

    /**
     * Initializes the input system for the Quest controllers.
     */
    private _initializeQuestInput(): void {
        // Add event listener for when a new controller is connected.
        this._xr.input.onControllerAddedObservable.add((controller) => {
            // Initialize motion controller components when available.
            controller.onMotionControllerInitObservable.add((motionController) => {
                // Retrieve component IDs for the motion controller.
                const [triggerId, gripId, thumbstickId, primaryId, secondaryId] = motionController.getComponentIds();
                const handedness = motionController.handedness;

                // Set the motion controller for the given handedness.
                if (handedness === 'left') {
                    this._leftController = motionController;
                } else if (handedness === 'right') {
                    this._rightController = motionController;
                }

                // Attach anchor to the controller.
                const anchor = handedness === 'left' ? this._leftAnchor : this._rightAnchor;
                anchor.setParent(controller.grip);
                anchor.rotation = controller.grip.rotation.clone();
                anchor.position = new Vector3(0, 0, 0);

                // Get each component of the motion controller.
                const trigger = motionController.getComponent(triggerId);
                const primary = motionController.getComponent(primaryId);
                const secondary = motionController.getComponent(secondaryId);
                const grip = motionController.getComponent(gripId);
                const thumbstick = motionController.getComponent(thumbstickId);

                // Set up button listeners for each component.
                this._setupButtonListeners(handedness, trigger, primary, secondary, grip, thumbstick);
            });
        });
    }

    /**
     * Sets up button listeners for the given controller components.
     * @param controller The controller handedness.
     * @param trigger The trigger component.
     * @param primary The primary button component.
     * @param secondary The secondary button component.
     * @param grip The grip component.
     */
    private _setupButtonListeners(
        controller: string,
        trigger: WebXRControllerComponent,
        primary: WebXRControllerComponent,
        secondary: WebXRControllerComponent,
        grip: WebXRControllerComponent,
        thumbstick: WebXRControllerComponent
    ): void {
        // Listener for the trigger button.
        trigger.onButtonStateChangedObservable.add((component) => {
            this.setTrigger(controller, component.pressed, component.value);
        });

        // Listener for the primary button.
        primary.onButtonStateChangedObservable.add((component) => {
            this.setPrimary(controller, component.pressed);
        });

        // Listener for the secondary button.
        secondary.onButtonStateChangedObservable.add((component) => {
            this.setSecondary(controller, component.pressed);
        });

        // Listener for the grip button.
        grip.onButtonStateChangedObservable.add((component) => {
            this.setGrip(controller, component.pressed, component.value);
        });

        // Listener for the thumbstick button.
        thumbstick.onButtonStateChangedObservable.add((component) => {
            this.setThumbstick(controller, component.pressed, component.axes.x, component.axes.y);
        });
    }

    /**
     * Hide or show the controllers and laser.
     * @param visible True to show the controllers and laser, false to hide them.
     * @param controllerSide The side of the controller to hide.
     */
    public setControllerVisibility(visible: boolean, controllerSide: 'left' | 'right' | 'both' = 'both'): void {
        if (!this._xr) return;
        this._xr.input.controllers.forEach((controller, index) => {
            if (
                (controllerSide === 'right' && index === 1) ||
                (controllerSide === 'left' && index === 0) ||
                controllerSide === 'both'
            ) {
                controller.motionController!.rootMesh.getChildMeshes().forEach((mesh) => {
                    mesh.isVisible = visible;
                });
            }
        });

        // Hide the laser and pointer
        if (visible) {
            this._xr.pointerSelection.displayLaserPointer = true;
            this._xr.pointerSelection.displaySelectionMesh = true;
        } else {
            if (controllerSide === 'both') {
                this._xr.pointerSelection.displayLaserPointer = false;
                this._xr.pointerSelection.displaySelectionMesh = false;
            }
        }
    }

    /**
     * Hide or show the controllers and laser.
     * @param visible True to show the controllers and laser, false to hide them.
     * @param controllerSide The side of the controller to hide.
     */
    private _hideMeshWithChildren(mesh: AbstractMesh, hide: boolean) {
        mesh.isVisible = hide;
        mesh.getChildren().forEach((child) => {
            if (child instanceof AbstractMesh) {
                this._hideMeshWithChildren(child, hide);
            }
        });
    }

    /**
     * Vibrate the controllers.
     * @param handedness witch controller to vibrate
     * @param intensity intensity of the vibration
     * @param duration duration of the vibration
     * @param timeout time before the vibration
     */
    public vibrateController(
        handedness: 'left' | 'right' | 'both',
        intensity: number,
        duration: number,
        timeout: number = 0
    ): void {
        const vibrate = (controller: WebXRAbstractMotionController) => {
            if (controller) {
                setTimeout(() => {
                    controller.pulse(intensity, duration);
                }, timeout);
            }
        };

        if (handedness === 'both') {
            vibrate(this._leftController);
            vibrate(this._rightController);
        } else {
            const controller = handedness === 'left' ? this._leftController : this._rightController;
            vibrate(controller);
        }
    }
}

export default QuestInput;
