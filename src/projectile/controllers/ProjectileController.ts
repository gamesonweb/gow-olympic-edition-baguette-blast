import BaseBonusController from '../../bonus/controllers/BaseBonusController';
import EnemyController from '../../enemy/controllers/EnemyController';
import PigeonBossController from '../../enemy/controllers/PigeonBossController';
import Game from '../../game/Game';
import PlayerController from '../../player/controllers/PlayerController';
import ReturnButton from '../../UI/ReturnButton';
import WallController from '../../wall/controllers/WallController';
import ProjectileModel from '../models/ProjectileModel';
import ProjectileView from '../views/ProjectileView';

abstract class ProjectileController implements ICollider {
    // MVC
    protected _view: ProjectileView;
    protected _model: ProjectileModel;

    /////////////////
    // Constructor //
    /////////////////

    public constructor(view: ProjectileView, model: ProjectileModel) {
        // MVC
        this._view = view;
        this._model = model;

        // Create the hitbox
        this._model.hitbox = Game.instance.assetManager.createHitbox(this._view.mesh, '', this._model.hitboxPadding);

        // Orient the projectile
        this._view.mesh.lookAt(this._view.mesh.position.add(this._model.speedVector));

        // Add to collider
        Game.instance.collisionManager.addCollider(this);
    }

    //////////////
    // Collider //
    //////////////

    public collidesWith(other: ICollider): boolean {
        // Check if the projectile collides with an enemy
        if (other instanceof EnemyController) {
            if (other instanceof PigeonBossController && other.hitbox.intersectsMesh(this._model.hitbox)) {
                //console.log('Projectile hit boss');
                //console.log(other.health);
                other.health -= 1;
                if (other.health <= 0) {
                    return true;
                } else {
                    // Dispose the projectile
                    this.dispose();
                    return false;
                }
            } else if (other.hitbox.intersectsMesh(this._model.hitbox)) {
                // console.log('Projectile hit enemy');
                return true;
            }
        }

        // Check if the projectile collides with a bonus
        else if (other instanceof BaseBonusController) {
            if (other.hitbox.intersectsMesh(this._model.hitbox)) {
                // console.log('Projectile hit bonus');
                return true;
            }
        }

        // Check if the projectile collides with the player
        else if (other instanceof PlayerController) {
            if (other.headHitbox.intersectsMesh(this._model.hitbox)) {
                // console.log('Projectile hit player');
                return true;
            } else if (other.bodyHitbox.intersectsMesh(this._model.hitbox)) {
                // console.log('Projectile hit player');
                return true;
            }
        }

        // Check if the projectile collides colliders
        else if (other instanceof WallController) {
            if (other.hitbox.intersectsMesh(this._model.hitbox)) {
                // console.log('Projectile hit wall');
                return true;
            }
        }

        // Check if the projectile collides with return button
        else if (other instanceof ReturnButton) {
            if (other.mesh.intersectsMesh(this._model.hitbox)) {
                // console.log('Projectile hit return button');
                return true;
            }
        }

        // Otherwise, return false
        return false;
    }

    public onCollision(): void {
        this.dispose();
    }

    ////////////
    // Update //
    ////////////

    public update(deltaTime: number): void {
        // Increment the time of life
        this._model.timeOfLife += deltaTime;

        // Update the position of the projectile
        this._updatePosition(deltaTime);

        // Check disposal conditions
        this._checkDisposalConditions();
    }

    private _checkDisposalConditions(): void {
        // if the projectile is under the ground, dispose
        if (this._model.position.y < -1) {
            // console.log('Projectile under the ground');
            this.dispose();
        }

        // if time of life is over, dispose
        else if (this._model.timeOfLife > this._model.maxTimeOfLife) {
            // console.log('Projectile time of life over');
            this.dispose();
        }
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

    public get canBeDisposed(): boolean {
        return this._model.canBeDisposed;
    }

    /////////////
    // Dispose //
    /////////////

    public dispose(): void {
        this._model.canBeDisposed = true;
        Game.instance.collisionManager.removeCollider(this);
        this._view.dispose();
        this._model.dispose();
    }
}
export default ProjectileController;
