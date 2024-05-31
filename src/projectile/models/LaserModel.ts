import { Vector3 } from '@babylonjs/core';
import ProjectileModel from './ProjectileModel';

class LaserModel extends ProjectileModel {
    public constructor(initialPosition: Vector3, initialOrientation: Vector3, initialSpeedVector: Vector3) {
        super(initialPosition, initialOrientation, initialSpeedVector, 1, 60, 10, 1, []);
    }
}

export default LaserModel;
