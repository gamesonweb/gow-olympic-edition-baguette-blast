import { AbstractMesh, Vector3 } from '@babylonjs/core';
import EnemyController from '../enemy/controllers/EnemyController';
import IBehaviour from './IBehaviour';

class AttractEnemy implements IBehaviour {
    private _enemies: EnemyController[];
    private _force: number;
    private _radius: number;

    public constructor(enemies: EnemyController[], force: number, radius: number) {
        this._enemies = enemies;
        this._force = force;
        this._radius = radius;
    }

    public getForceVector(deltaTime: number, mesh: AbstractMesh): Vector3 {
        let nearestEnemy: EnemyController | null = null;
        let minDistance = Infinity;

        // Find the nearest enemy within the detection radius
        for (const enemy of this._enemies) {
            const distance = enemy.position.subtract(mesh.position).length();

            if (distance < this._radius && distance < minDistance) {
                minDistance = distance;
                nearestEnemy = enemy;
            }
        }

        // If a nearest enemy is found, apply the force towards it
        if (nearestEnemy) {
            const direction = nearestEnemy.position.subtract(mesh.position).normalize();
            return direction.scale(this._force);
        }

        // Return zero vector if no enemy is found within detection radius
        return Vector3.Zero();
    }
}

export default AttractEnemy;
