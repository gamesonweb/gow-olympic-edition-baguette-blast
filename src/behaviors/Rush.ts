import { AbstractMesh, Vector3 } from '@babylonjs/core';
import IBehaviour from './IBehaviour';
import Game from '../game/Game';

class Rush implements IBehaviour {
    private _force: number;
    private _radius: number;
    private _targetPosition: Vector3;
    private _timeSinceLastChange: number;
    private _nextRushTime: number;
    private _doingFigureEight: boolean;

    constructor(
        force: number
    ) {
        this._force = force;
        this._radius = 5;
        this._timeSinceLastChange = 0;
        this._targetPosition = Game.instance.cameraManager.playerCamera.position;
        this._nextRushTime = Math.random() * 7 + 3; // Random time between 3 and 10 seconds
        this._doingFigureEight = true;
    }

    private _calculateFigureEightPosition(time: number, position: Vector3): Vector3 {
        const t = time * Math.PI; // Convert time to radians
        const x = this._radius * Math.sin(t);
        const z = this._radius * Math.sin(2 * t) / 2; // Adjust the ratio for a more figure-eight shape
        return new Vector3(position.x + x, position.y, position.z + z);
    }

    getForceVector(deltaTime: number, mesh: AbstractMesh, currentForce: Vector3): Vector3 {
        currentForce;
        this._timeSinceLastChange += deltaTime;
        
        if (this._doingFigureEight) {
            // Calculate new position in figure-eight pattern
            const figureEightPosition = this._calculateFigureEightPosition(this._timeSinceLastChange, mesh.position);
            const direction = figureEightPosition.subtract(mesh.position);
            direction.normalize();
            const force = direction.scale(this._force * deltaTime);

            if (this._timeSinceLastChange >= this._nextRushTime) {
                this._doingFigureEight = false;
                this._timeSinceLastChange = 0;
                this._nextRushTime = Math.random() * 7 + 3; // Reset rush time
            }

            return force;
        } else {
            // Rush towards the target
            const direction = this._targetPosition.subtract(mesh.position).normalize();
            const rushForce = direction.scale(this._force * 2 * deltaTime); // Increase force for rushing

            if (this._timeSinceLastChange >= this._nextRushTime) {
                this._doingFigureEight = true;
                this._timeSinceLastChange = 0;
                this._nextRushTime = Math.random() * 7 + 3; // Reset rush time
            }

            return rushForce;
        }
    }
}

export default Rush;