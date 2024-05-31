import { Vector3, Quaternion, Matrix } from '@babylonjs/core';
import ProjectileController from './ProjectileController';
import ChaosBallView from '../views/ChaosBallView';
import ChaosBallModel from '../models/ChaosBallModel';

class ChaosBallController extends ProjectileController {
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
    private _verticalTurnDirection: number; // -1 for down, 1 for up

    constructor(view: ChaosBallView, model: ChaosBallModel) {
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
        this._verticalTurnDirection = 1; // Start by moving up

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

        // Apply lateral and vertical movement if the delay has passed
        if (this._timeSinceLastTurn >= this._delayBetweenTurns) {
            // Adjust factor calculation for longer turns
            const lateralFactor = (
                this._timeElapsed % (this._maxLateralTime * this._turnDurationMultiplier)) / 
                (this._maxLateralTime * this._turnDurationMultiplier);
            const verticalFactor = (
                this._timeElapsed % (this._maxLateralTime * this._turnDurationMultiplier)) / 
                (this._maxLateralTime * this._turnDurationMultiplier);

            const lateralAngle = this._curveAngle * Math.sin(lateralFactor * 2 * Math.PI) * this._turnDirection;
            const verticalAngle = this._curveAngle * 
                Math.cos(verticalFactor * 2 * Math.PI) * this._verticalTurnDirection;

            const rotationQuaternion = Quaternion.RotationYawPitchRoll(lateralAngle, verticalAngle, 0);

            // Convert the quaternion to a rotation matrix
            const rotationMatrix = new Matrix();
            Matrix.FromQuaternionToRef(rotationQuaternion, rotationMatrix);

            // Rotate the lateral and vertical direction vectors
            const lateralDirection = new Vector3(1, 0, 0); // Lateral movement is along the X axis
            const verticalDirection = new Vector3(0, 1, 0); // Vertical movement is along the Y axis

            const rotatedLateralDirection = Vector3.TransformCoordinates(lateralDirection, rotationMatrix);
            const rotatedVerticalDirection = Vector3.TransformCoordinates(verticalDirection, rotationMatrix);

            // Apply the distance multiplier during turns
            const lateralMovement = rotatedLateralDirection.scale(deltaTime * this._turnDistanceMultiplier);
            const verticalMovement = rotatedVerticalDirection.scale(deltaTime * this._turnDistanceMultiplier);

            // Combine lateral and vertical movement
            this._view.mesh.position.addInPlace(lateralMovement).addInPlace(verticalMovement);

            // Reset the time since the last turn and switch the turn direction after the extended duration
            if (this._timeElapsed % (this._maxLateralTime * this._turnDurationMultiplier) < deltaTime) {
                this._timeSinceLastTurn = 0;
                this._turnDirection *= -1; // Switch lateral direction
                this._verticalTurnDirection *= -1; // Switch vertical direction
            }
        }
    }
}

export default ChaosBallController;
