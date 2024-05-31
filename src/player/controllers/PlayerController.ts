import { AbstractMesh, Vector3 } from '@babylonjs/core';
import EnemyController from '../../enemy/controllers/EnemyController';
import { SoundPlayer } from '../../game/controllers/SoundPlayer';
import Game from '../../game/Game';
import InputManager from '../../inputs/InputManager';
import ProjectileController from '../../projectile/controllers/ProjectileController';
import WeaponController from '../../weapon/controllers/WeaponController';
import PlayerModel from '../models/PlayerModels';
import PlayerView from '../views/PlayerViews';

class PlayerController implements ICollider {
    // Mvc
    private _model: PlayerModel;
    private _view: PlayerView;

    // Inputs
    private _inputManager: InputManager;
    private _leftHand: AbstractMesh;
    private _rightHand: AbstractMesh;

    /////////////////
    // Constructor //
    /////////////////

    public constructor(model: PlayerModel, view: PlayerView) {
        this._model = model;
        this._view = view;

        this._inputManager = Game.instance.inputManager;
        this._leftHand = Game.instance.inputManager.leftAnchor;
        this._rightHand = Game.instance.inputManager.rightAnchor;

        // Add to collider
        Game.instance.collisionManager.addCollider(this);

        // Sound
        this._initAudio();
    }

    private _initAudio(): void {
        this._model.hitSound = new SoundPlayer('playerHit', null, true);
    }

    ///////////////
    // Collision //
    ///////////////

    public collidesWith(): boolean {
        return false;
    }

    public onCollision(other: ICollider): void {
        if (other instanceof EnemyController) {
            console.log('Player hit by enemy');
            this._model.health -= 10;
            this._model.hitSound.play(true);
            // TODO: Define what happens when player is hit by enemy
        } else if (other instanceof ProjectileController) {
            console.log('Player hit by projectile');
            this._model.health -= 10;
            this._model.hitSound.play(true);
            // TODO: Define what happens when player is hit by projectile
        }

        return;
    }

    //////////////////
    // Weapon Logic //
    //////////////////

    public giveWeapon(hand: 'left' | 'right', weapon: WeaponController): void {
        // Determine which weapon and hand to use
        const key = hand === 'left' ? 'weaponLeft' : 'weaponRight';
        const handObject = hand === 'left' ? this._leftHand : this._rightHand;

        // Assign the weapon and grab it with the appropriate hand
        this._model[key] = weapon;
        this._model[key].grab(handObject);
    }

    get weaponLeft(): WeaponController {
        return this._model.weaponLeft;
    }

    get weaponRight(): WeaponController {
        return this._model.weaponRight;
    }

    public dropWeapon(hand: 'left' | 'right' | 'both'): void {
        this._model.dropWeapon(hand);
    }

    //////////////
    // Teleport //
    //////////////

    public teleport(position: Vector3): void {
        this._view.position = position;
    }

    ////////////
    // health //
    ////////////

    public get health(): number {
        return this._model.health;
    }

    public set health(value: number) {
        this._model.health = value;
    }

    //////////////
    // Hitboxes //
    //////////////

    public get headHitbox(): AbstractMesh {
        return this._view.headHitbox;
    }

    public get bodyHitbox(): AbstractMesh {
        return this._view.bodyHitbox;
    }

    //////////////
    // Position //
    //////////////

    public get positionHead(): Vector3 {
        return this._view.headHitbox.getAbsolutePosition();
    }

    public get positionBody(): Vector3 {
        return this._view.bodyHitbox.getAbsolutePosition();
    }

    ////////////
    // Update //
    ////////////

    public update(deltaTime: number): void {
        // Check conditions and fire weapons if necessary
        this._triggerWeapons();

        // Update weapons
        this._updateWeapons(deltaTime);

        // Update player view
        this._view.update();
    }

    private _triggerWeapons(): void {
        // Fire weapon on right hand
        if (this._inputManager.rightTrigger.value > 0.8 && this._model.weaponRight) {
            this._model.weaponRight.fire('right');
        }
        // Fire weapon on left hand
        if (this._inputManager.leftTrigger.value > 0.8 && this._model.weaponLeft) {
            this._model.weaponLeft.fire('left');
        }
    }

    private _updateWeapons(deltaTime: number): void {
        if (this._model.weaponLeft) {
            this._model.weaponLeft.update(deltaTime);
        }

        if (this._model.weaponRight) {
            this._model.weaponRight.update(deltaTime);
        }
    }

    /////////////
    // Dispose //
    /////////////

    public dispose(): void {
        Game.instance.collisionManager.removeCollider(this);
        this._model.dispose();
        this._view.dispose();
    }
}

export default PlayerController;
