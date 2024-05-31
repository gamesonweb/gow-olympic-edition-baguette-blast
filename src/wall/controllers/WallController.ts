import { AbstractMesh } from '@babylonjs/core';
import WallModel from '../models/WallModel';
import WallView from '../view/WallView';

class WallController implements ICollider {
    // MVC
    private _view: WallView;
    private _model: WallModel;

    /////////////////
    // Constructor //
    /////////////////

    public constructor(view: WallView, model: WallModel) {
        // MVC
        this._view = view;
        this._model = model;
    }

    //////////////
    // Collider //
    //////////////

    collidesWith(): boolean {
        return false;
    }

    onCollision(): void {}

    ///////////////
    // Accessors //
    ///////////////

    public get hitbox(): AbstractMesh {
        return this._model.hitbox;
    }
}

export default WallController;
