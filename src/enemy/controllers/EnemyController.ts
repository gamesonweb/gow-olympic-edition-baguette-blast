import { AbstractMesh, Vector3 } from '@babylonjs/core';
import { SoundPlayer } from '../../game/controllers/SoundPlayer';
import Game from '../../game/Game';
import BaseEnemyModel from '../models/BaseEnemyModel';
import BaseEnemyView from '../views/BaseEnemyView';

abstract class EnemyController implements ICollider {
    // MVC
    protected _model: BaseEnemyModel;
    protected _view: BaseEnemyView;

    /////////////////
    // Constructor //
    /////////////////

    public constructor(model: BaseEnemyModel, view: BaseEnemyView) {
        // MVC
        this._model = model;
        this._view = view;

        // Initialize the hitbox
        this._model.hitbox = this._createHitbox();

        // Sound
        this._model.deathSound = this._initAudio();

        // Add to collider
        Game.instance.collisionManager.addCollider(this);
    }

    protected abstract _createHitbox(): AbstractMesh;

    protected abstract _initAudio(): SoundPlayer;

    //////////////
    // Collider //
    //////////////

    public collidesWith(): boolean {
        // No collision check in this class, all collision checks are done in the projectile controller
        return false;
    }

    public onCollision(): void {
        // Play the sound
        if (this._model.deathSound) {
            this._model.deathSound.play(true);
        }

        // Dispose the enemy
        this.dispose();
    }

    ////////////
    // Update //
    ////////////

    public update(deltaTime: number): void {
        // Update the position of the enemy
        this._updatePosition(deltaTime);
    }

    private _updatePosition(deltaTime: number): void {
        // Apply initial damping to simulate friction and air resistance
        const dampingFactor = this._model.dampingFactor;
        this._model.speedVector.scaleInPlace(dampingFactor);

        // Accumulate the forces from all behaviors
        for (const behavior of this._model.behaviors) {
            const force = behavior.getForceVector(deltaTime, this._view.mesh, this._model.speedVector);
            this._model.speedVector.addInPlace(force);
        }

        // Limit the speed vector to the maximum speed
        if (this._model.speedVector.length() > this._model.maxSpeed) {
            this._model.speedVector.normalize().scaleInPlace(this._model.maxSpeed);
        }

        // Update the position of the mesh
        this._model.position.addInPlace(this._model.speedVector.scale(deltaTime));
        this._view.mesh.position = this._model.position;
    }

    //////////////
    // Accessor //
    //////////////

    public get hitbox(): AbstractMesh {
        return this._model.hitbox;
    }

    public get position(): Vector3 {
        return this._model.position;
    }

    public get canBeDisposed(): boolean {
        return this._model.canBeDisposed;
    }

    public abstract get type(): string;

    /////////////
    // Dispose //
    /////////////

    public dispose(): void {
        // Set the flag to true
        this._model.canBeDisposed = true;

        // Remove from collider
        Game.instance.collisionManager.removeCollider(this);

        // MVC
        this._view.dispose();
        this._model.dispose();
    }
}

export default EnemyController;
