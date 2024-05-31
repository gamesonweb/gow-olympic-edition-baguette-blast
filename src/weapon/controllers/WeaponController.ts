import { AbstractMesh, Vector3 } from '@babylonjs/core';
import { SoundPlayer } from '../../game/controllers/SoundPlayer';
import Game from '../../game/Game';
import { ProjectileFactory } from '../../projectile/ProjectileFactory';
import WeaponModel from '../models/WeaponModel';
import WeaponView from '../views/WeaponView';

abstract class WeaponController {
    // MVC
    protected _model: WeaponModel;
    protected _view: WeaponView;

    /////////////////
    // Constructor //
    /////////////////

    public constructor(view: WeaponView, model: WeaponModel) {
        // MVC
        this._view = view;
        this._model = model;

        // Init audio
        this._model.fireSound = this._initAudio();
    }

    protected abstract _initAudio(): SoundPlayer;

    //////////
    // Fire //
    //////////

    public fire(controller :  'left' | 'right' | 'both'): void {
        // Check if the weapon can fire
        if (!this._canFire()) {
            return;
        }

        if (controller === 'right') {
            Game.instance.inputManager.vibrateController('right', 0.5, 100, 0);
        }else if (controller === 'left') {
            Game.instance.inputManager.vibrateController('left', 0.5, 100, 0);
        }

        // Play the sound
        if (this._model.fireSound) {
            this._model.fireSound.play(true);
        }

        // Reset the time since last shot and decrease durability
        this._model.timeSinceLastShot = 0;
        this._model.durability--;

        // Get the position and speed vector
        const initialPosition = this._model.parent.getAbsolutePosition().clone().add(this._model.parent.forward.scale(0.5)).add(this._model.parent.forward.scale(1));
        const initialSpeedVector = this._getInitialForce();
        const initialOrientation = this._getInitialOrientation(initialSpeedVector);

        // Create a new projectile
        const projectile = ProjectileFactory.createProjectile(
            this._model.projectileType,
            initialPosition,
            initialSpeedVector,
            initialOrientation
        );

        // Add to projectile list
        this._model.projectiles.push(projectile);
    }

    /**
     * Check if the weapon can fire
     *
     * @returns True if the weapon can fire
     */
    protected _canFire(): boolean {
        return (
            this._model.isGrabed &&
            this._model.timeSinceLastShot > this._model.cooldownSecond &&
            this._model.durability > 0
        );
    }

    /**
     * Get the initial force of the projectile
     *
     * @returns The initial force of the projectile
     */
    protected abstract _getInitialForce(): Vector3;

    /**
     * Get the initial orientation of the projectile
     * Default to the normalized speed vector
     *
     * @param speedVector The initial speed vector of the projectile
     * @returns The initial orientation of the projectile
     *
     */
    protected _getInitialOrientation(speedVector: Vector3): Vector3 {
        return speedVector.clone().normalize();
    }

    ////////////
    // Update //
    ////////////

    public update(deltaTime: number): void {
        // Update time since last shot
        // use time scale to keep the same cooldown
        this._model.timeSinceLastShot += (1 / Game.instance.timeControl.getTimeScale()) * deltaTime;

        // Clear disposed projectiles
        this._model.projectiles = this._model.projectiles.filter((projectile) => {
            return !projectile.canBeDisposed;
        });

        // Update projectiles
        this._model.projectiles.forEach((projectile) => {
            projectile.update(deltaTime);
        });

        // Check if the weapon must be disposed
        if (this._checkDisposalConditions()) {
            this.dispose();
        }

        // Check if the weapon can be disposed
        if (this._model.isDisposed && this._model.projectiles.length === 0) {
            this._model.canBeDisposed = true;
        }
    }

    private _checkDisposalConditions(): boolean {
        // if the weapon is out of durability, dispose
        return this._model.durability <= 0;
    }

    //////////
    // Grab //
    //////////

    public grab(hand: AbstractMesh): void {
        this._model.isGrabed = true;
        this._model.parent = hand;
        this._view.mesh.parent = hand;
    }

    public throw(): void {
        this._model.isGrabed = false;
        this._view.mesh.parent = null;
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
        this._model.isDisposed = true;

        this._view.dispose();
        this._model.dispose();

        this._model.projectiles.forEach((projectile) => {
            projectile.dispose();
        });
    }
}
export default WeaponController;
