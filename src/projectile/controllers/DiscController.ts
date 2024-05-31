import { Vector3, Quaternion, Matrix } from '@babylonjs/core';
import ProjectileController from './ProjectileController';
import DiscView from '../views/DiscView';
import DiscModel from '../models/DiscModel';

class DiscController extends ProjectileController {
    private _initialDirection: Vector3;
    private _timeElapsed: number;
    private _maxLateralTime: number; // Time to complete one lateral shift
    private _turnDirection: number; // -1 for left, 1 for right
    private _curveAngle: number; // Angle to curve
    private _rotationSpeed: number; // Speed of rotation
    private _delayBetweenTurns: number; // Delay between each turn
    private _timeSinceLastTurn: number; // Time elapsed since the last turn
    private _turnDistanceMultiplier: number; // Multiplier for the distance during turns
    private _turnDurationMultiplier: number; // Multiplier for the duration of turns

    constructor(view: DiscView, model: DiscModel) {
        super(view, model);
        this._initialDirection = view.mesh.forward.clone().normalize();
        this._timeElapsed = 0;
        this._maxLateralTime = 1; // Time to complete one lateral shift
        this._turnDirection = 1; // Start by moving right
        this._curveAngle = Math.PI / 0.5; // Increase angle for larger waves
        this._rotationSpeed = Math.PI / 0.5; // Speed of rotation
        this._delayBetweenTurns = 1; // Delay in seconds between each turn
        this._timeSinceLastTurn = 1;
        this._turnDistanceMultiplier = 2; // Multiplier for the distance during turns
        this._turnDurationMultiplier = 3; // Multiplier for the duration of turns

        // Ensure the rotationQuaternion is initialized
        if (!this._view.mesh.rotationQuaternion) {
            this._view.mesh.rotationQuaternion = Quaternion.Identity();
        }
    }

    public update(deltaTime: number): void {
        super.update(deltaTime);
        this._timeElapsed += deltaTime;
        this._timeSinceLastTurn += deltaTime;

        // Move forward
        const forwardMovement = this._initialDirection.scale(deltaTime);
        this._view.mesh.position.addInPlace(forwardMovement);

        // Apply lateral movement if the delay has passed
        if (this._timeSinceLastTurn >= this._delayBetweenTurns) {
            // Adjust lateral factor calculation for longer turns
            const lateralFactor = (
                this._timeElapsed % (this._maxLateralTime * this._turnDurationMultiplier)) / 
                (this._maxLateralTime * this._turnDurationMultiplier);
            const angle = this._curveAngle * Math.sin(lateralFactor * 2 * Math.PI) * this._turnDirection;
            const rotationQuaternion = Quaternion.RotationYawPitchRoll(angle, 0, 0);

            // Convert the quaternion to a rotation matrix
            const rotationMatrix = new Matrix();
            Matrix.FromQuaternionToRef(rotationQuaternion, rotationMatrix);

            // Rotate the lateral direction vector
            const lateralDirection = new Vector3(1, 0, 0); // Lateral movement is along the X axis
            const rotatedLateralDirection = Vector3.TransformCoordinates(lateralDirection, rotationMatrix);

            // Apply the distance multiplier during turns
            const lateralMovement = rotatedLateralDirection.scale(deltaTime * this._turnDistanceMultiplier);
            this._view.mesh.position.addInPlace(lateralMovement);

            // Reset the time since the last turn and switch the turn direction after the extended duration
            if (this._timeElapsed % (this._maxLateralTime * this._turnDurationMultiplier) < deltaTime) {
                this._timeSinceLastTurn = 0;
                this._turnDirection *= -1; // Switch direction
            }
        }
    }
}

export default DiscController;
