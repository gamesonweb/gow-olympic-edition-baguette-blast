import { Vector3 } from '@babylonjs/core';
import { SoundPlayer } from '../../game/controllers/SoundPlayer';
import WeaponController from '../controllers/WeaponController';
import HandModel from '../models/HandModel';
import HandView from '../views/HandView';

class HandController extends WeaponController {
    protected _model: HandModel;
    protected _view: HandView;

    /////////////////
    // Constructor //
    /////////////////

    constructor(view: HandView, model: HandModel) {
        super(view, model);
    }

    protected _initAudio(): SoundPlayer {
        // No sound for hand
        return null;
    }

    //////////
    // Fire //
    //////////

    protected _getInitialForce(): Vector3 {
        let direction = new Vector3(0, 0, 0);
        let force = 0;

        if (this._model.savPosition && this._model.actualPosition) {
            direction = this._model.actualPosition.subtract(this._model.savPosition).normalize();
            force =
                (this._model.actualPosition.subtract(this._model.savPosition).length() * 1000) /
                (Date.now() - this._model.savPositionTime);
        }

        return direction.scale(force);
    }

    ////////////
    // Update //
    ////////////

    public update(deltaTime: number): void {
        super.update(deltaTime);

        // Save position all 100ms
        if (this._model.timeSinceLastSave > 0.1) {
            this._savePosition(this._model.parent.getAbsolutePosition());
            this._model.timeSinceLastSave = 0;
        }
        this._model.timeSinceLastSave += deltaTime;
    }

    private _savePosition(position: Vector3): void {
        this._model.savPosition = this._model.actualPosition;
        this._model.savPositionTime = Date.now();
        this._model.actualPosition = position.clone();
    }
}
export default HandController;
