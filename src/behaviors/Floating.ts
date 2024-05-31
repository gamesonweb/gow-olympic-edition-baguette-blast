import { Vector3 } from '@babylonjs/core';
import IBehaviour from './IBehaviour';

class Floating implements IBehaviour {
    private _force: number;
    private _oscillationTime: number;
    private _phaseOffset: number;
    private _elapsedTime: number = 0; // Temps accumulé depuis l'activation

    public constructor(force: number = 0.08, oscillationFreq: number = 400) {
        this._force = force;
        this._oscillationTime = oscillationFreq;
        this._phaseOffset = Math.random() * 2 * Math.PI;
    }

    public getForceVector(deltaTime: number): Vector3 {
        this._elapsedTime += deltaTime; // Mettre à jour le temps écoulé
        const oscillation = Math.sin(this._elapsedTime / this._oscillationTime + this._phaseOffset) * this._force;
        return new Vector3(0, oscillation, 0);
    }
}

export default Floating;
