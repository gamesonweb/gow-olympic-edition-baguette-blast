import { AbstractMesh } from '@babylonjs/core';

class WallModel {
    private _hitbox: AbstractMesh;

    /////////////////
    // Constructor //
    /////////////////

    public constructor(hitbox: AbstractMesh) {
        this._hitbox = hitbox;
    }

    ///////////////
    // Accessors //
    ///////////////

    public get hitbox(): AbstractMesh {
        return this._hitbox;
    }
}

export default WallModel;
