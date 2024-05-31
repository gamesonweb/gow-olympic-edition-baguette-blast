import { AbstractMesh, Vector3 } from '@babylonjs/core';
import IBehaviour from './IBehaviour';

class MoveAtoB implements IBehaviour {
    private _force: number;
    private _radius: number;
    private _positionA: Vector3;
    private _positionB: Vector3;

    constructor(force: number, radius: number, positionA: Vector3, positionB: Vector3) {
        this._force = force;
        this._radius = radius;
        this._positionA = positionA;
        this._positionB = positionB;
    }

    getForceVector(deltaTime: number, mesh: AbstractMesh, currentForce: Vector3): Vector3 {
        // if metadata is not defined, set it to an empty object
        if (!mesh.metadata) {
            mesh.metadata = {};
        }

        // TODO check if all enemies are destroyed properly, do a log here to test
        currentForce;
        // Go to A then to B then to A then to B
        // If the mesh has no target, set the target to A
        if (!mesh.metadata.target) {
            mesh.metadata.target = this._positionA;
        }

        // If the mesh is close to the target, change the target
        if (mesh.position.subtract(mesh.metadata.target).length() < this._radius) {
            if (mesh.metadata.target.equals(this._positionA)) {
                mesh.metadata.target = this._positionB;
            } else {
                mesh.metadata.target = this._positionA;
            }
        }

        // Calculate the direction to the target
        const direction = mesh.metadata.target.subtract(mesh.position);
        direction.normalize();

        // Calculate the force vector proportional to the distance to the target (close = slow, far = fast)
        const distance = mesh.position.subtract(mesh.metadata.target).length();
        const force = direction.scale(this._force * (distance / 100));
        return force;
    }
}
export default MoveAtoB;
