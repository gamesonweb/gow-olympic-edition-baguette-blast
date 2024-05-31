import { AbstractMesh, Vector3 } from '@babylonjs/core';

interface IBehaviour {
    getForceVector(deltaTime: number, mesh: AbstractMesh, currentForce: Vector3): Vector3;
}

export default IBehaviour;
