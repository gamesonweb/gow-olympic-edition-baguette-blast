import { Vector3 } from '@babylonjs/core';
import IBehaviour from './IBehaviour';

class Gravity implements IBehaviour {
    private _force: number;

    constructor(force: number) {
        this._force = force;
    }

    public getForceVector(deltaTime: number): Vector3 {
        return new Vector3(0, -this._force * deltaTime, 0);
    }
}

export default Gravity;
