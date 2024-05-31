import { AbstractMesh } from '@babylonjs/core';

abstract class BaseBonusModel {
    // Rotation speed
    private _rotationSpeed: number;

    // Hitbox
    private _hitbox: AbstractMesh;
    private _hitboxPadding: number;

    // Activate
    private _isActivate;

    /////////////////
    // Constructor //
    /////////////////

    public constructor(rotationSpeed: number = 1) {
        this._rotationSpeed = rotationSpeed;
        this._hitboxPadding = 0;
        this._isActivate = false;
    }

    //////////////
    // Accessor //
    //////////////

    // Rotation speed
    public get rotationSpeed(): number {
        return this._rotationSpeed;
    }

    // Hitbox
    public get hitbox(): AbstractMesh {
        return this._hitbox;
    }

    public set hitbox(hitbox: AbstractMesh) {
        this._hitbox = hitbox;
    }

    // Hitbox padding
    public get hitboxPadding(): number {
        return this._hitboxPadding;
    }

    // Dispose
    public get isActivate(): boolean {
        return this._isActivate;
    }

    public set isActivate(isActivate: boolean) {
        this._isActivate = isActivate;
    }

    /////////////
    // Dispose //
    /////////////

    public dispose(): void {
        if (this._hitbox) {
            this._hitbox.dispose();
        }
    }
}

export default BaseBonusModel;
