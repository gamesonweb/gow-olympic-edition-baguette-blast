import { Vector3, Quaternion, Axis } from '@babylonjs/core';
import ProjectileController from './ProjectileController';
import BoomerangView from '../views/BoomerangView';
import BoomerangModel from '../models/BoomerangModel';

class BoomerangController extends ProjectileController {
    private _initialDirection: Vector3;
    private _timeElapsed: number;
    private _maxFlightTime: number; // The time it takes to reach the furthest point before returning
    private _turnDirection: number; // -1 for left, 1 for right
    private _curveAngle: number; // Angle to curve
    private _rotationSpeed: number; // Speed of rotation

    constructor(view: BoomerangView, model: BoomerangModel) {
        super(view, model);
        this._initialDirection = view.mesh.forward.clone().normalize().scaleInPlace(4);
        this._timeElapsed = 0;
        this._maxFlightTime = 2; // For example, 2 seconds to start curving
        this._turnDirection = Math.random() > 0.5 ? 1 : -1; // Randomly choose left or right
        this._curveAngle = Math.PI / 8 + Math.random() * (Math.PI / 8); // Random angle between π/8 and π/4
        this._rotationSpeed = Math.PI / 0.5; 

        // Ensure the rotationQuaternion is initialized
        if (!this._view.mesh.rotationQuaternion) {
            this._view.mesh.rotationQuaternion = Quaternion.Identity();
        }

        // Initialize the boomerang's orientation to be horizontal
        const initialRotation = Quaternion.RotationAxis(Axis.X, Math.PI / 2);
        this._view.mesh.rotationQuaternion.multiplyInPlace(initialRotation);
    }

    public update(deltaTime: number): void {
        super.update(deltaTime);
        this._timeElapsed += deltaTime;

        // Rotate the boomerang slowly around the Z-axis
        const rotationIncrement = Quaternion.RotationAxis(Axis.Z, this._rotationSpeed * deltaTime);
        this._view.mesh.rotationQuaternion.multiplyInPlace(rotationIncrement);

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

export default BoomerangController;
