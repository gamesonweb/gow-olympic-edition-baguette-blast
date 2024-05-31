import { AbstractMesh } from '@babylonjs/core';
import Game from '../../game/Game';
import BaseBonusModel from '../models/BaseBonusModel';
import BaseBonusView from '../views/BaseBonusView';

abstract class BaseBonusController implements ICollider {
    // MVC
    protected _model: BaseBonusModel;
    protected _view: BaseBonusView;

    /////////////////
    // Constructor //
    /////////////////

    public constructor(model: BaseBonusModel, view: BaseBonusView) {
        this._model = model;
        this._view = view;

        // Initialize the hitbox
        this._model.hitbox = this._createHitbox();

        // Add to collider
        Game.instance.collisionManager.addCollider(this);
    }

    private _createHitbox(): AbstractMesh {
        return Game.instance.assetManager.createHitbox(this._view.mesh, 'mm1', this._model.hitboxPadding);
    }

    //////////////
    // Collider //
    //////////////

    public collidesWith(): boolean {
        // No collision check in this class, all collision checks are done in the projectile controller
        return false;
    }

    public onCollision(): void {
        this.activate();
        this.dispose();
    }

    /////////////////
    // Publics API //
    /////////////////

    public attachTo(mesh: AbstractMesh, offsetY: number): void {
        this._view.mesh.parent = mesh;
        this._view.mesh.position.y = offsetY;
    }

    ////////////
    // Update //
    ////////////

    public update(deltaTime: number): void {
        // Slowly rotate the bonus
        this._view.mesh.rotation.y += this._model.rotationSpeed * deltaTime;
    }

    //////////////
    // Accessor //
    //////////////

    public get hitbox(): AbstractMesh {
        return this._model.hitbox;
    }

    public get isActivate(): boolean {
        return this._model.isActivate;
    }

    ////////////
    // Action //
    ////////////

    public activate(): void {
        this._model.isActivate = true;
    }

    /////////////
    // Dispose //
    /////////////

    public dispose(): void {
        this._model.isActivate = true;
        Game.instance.collisionManager.removeCollider(this);
        this._view.dispose();
        this._model.dispose();
    }
}

export default BaseBonusController;
