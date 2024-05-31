import { AbstractMesh, Vector3 } from '@babylonjs/core';
import IBehaviour from './IBehaviour';

class MoveFreelyInCube implements IBehaviour {
    private _force: number;
    private _radius: number;
    private _minPosition: Vector3;
    private _maxPosition: Vector3;
    private _targetPosition: Vector3;
    private _changePositionInterval: number; // Time in seconds between position changes
    private _timeSinceLastChange: number; // Accumulator for elapsed time

    constructor(
        force: number, radius: number, minPosition: Vector3, maxPosition: Vector3, changePositionInterval: number = 2
    ) {
        this._force = force;
        this._radius = radius;
        this._minPosition = minPosition;
        this._maxPosition = maxPosition;
        this._changePositionInterval = changePositionInterval;
        this._timeSinceLastChange = 0;
        this._targetPosition = this._getRandomPosition();
    }

    private _getRandomPosition(): Vector3 {
        const x = Math.random() * (this._maxPosition.x - this._minPosition.x) + this._minPosition.x;
        const y = Math.random() * (this._maxPosition.y - this._minPosition.y) + this._minPosition.y;
        const z = Math.random() * (this._maxPosition.z - this._minPosition.z) + this._minPosition.z;
        return new Vector3(x, y, z);
    }

    getForceVector(deltaTime: number, mesh: AbstractMesh, currentForce: Vector3): Vector3 {
        currentForce;
        // Update the time since the last position change
        this._timeSinceLastChange += deltaTime;

        // If the time since the last position change exceeds the interval, choose a new target position
        if (this._timeSinceLastChange >= this._changePositionInterval) {
            this._targetPosition = this._getRandomPosition();
            this._timeSinceLastChange = 0;
        }

        // Calculate the direction towards the target position
        const direction = this._targetPosition.subtract(mesh.position);
        direction.normalize();

        // Calculate the movement vector based on the force and direction
        const movement = direction.scale(this._force * deltaTime);

        return movement;
    }
}

export default MoveFreelyInCube;
