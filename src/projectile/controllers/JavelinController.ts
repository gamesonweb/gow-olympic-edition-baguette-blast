import { Vector3, Quaternion } from '@babylonjs/core';
import ProjectileController from './ProjectileController';
import JavelinView from '../views/JavelinView';
import JavelinModel from '../models/JavelinModel';

class JavelinController extends ProjectileController {
    private _initialDirection: Vector3;
    private _timeElapsed: number;
    private _maxFlightTime: number; // The time it takes to reach the furthest point before returning
    private _turnDirection: number; // -1 for left, 1 for right
    private _curveAngle: number; // Angle to curve

    constructor(view: JavelinView, model: JavelinModel) {
        super(view, model);
        this._initialDirection = view.mesh.forward.clone().normalize().scaleInPlace(4);
        this._timeElapsed = 0;
        this._maxFlightTime = 2; // For example, 2 seconds to start curving
        this._turnDirection = Math.random() > 0.5 ? 1 : -1; // Randomly choose left or right
        this._curveAngle = Math.PI / 8 + Math.random() * (Math.PI / 8); // Random angle between π/8 and π/4

        // Initialize the javelin's orientation to be 90° right
        view.mesh.rotate(Vector3.Up(), Math.PI / 2);
    }

    public update(deltaTime: number): void {
        super.update(deltaTime);
        this._timeElapsed += deltaTime;

        if (this._timeElapsed <= this._maxFlightTime) {
            // Going straight
            this._view.mesh.position.addInPlace(this._initialDirection.scale(deltaTime));
        } else {
            // Curving left or right
            const curveFactor = (this._timeElapsed - this._maxFlightTime) / this._maxFlightTime;
            const angle = this._curveAngle * curveFactor * this._turnDirection;
            const rotationQuaternion = Quaternion.RotationYawPitchRoll(angle, 0, 0);
            const curvedDirection = Vector3.Zero(); // Create a result vector to store the result

            this._initialDirection.rotateByQuaternionToRef(rotationQuaternion, curvedDirection);
            this._view.mesh.position.addInPlace(curvedDirection.scale(deltaTime));
        }
    }
}

export default JavelinController;
