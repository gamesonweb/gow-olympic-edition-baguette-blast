import { Vector3 } from '@babylonjs/core';
import { SoundPlayer } from '../../game/controllers/SoundPlayer';
import WeaponController from './WeaponController';
import ChaosGunView from '../views/ChaosGunView';
import ChaosGunModel from '../models/ChaosGunModel';

class ChaosGunController extends WeaponController {
    /////////////////
    // Constructor //
    /////////////////

    constructor(view: ChaosGunView, model: ChaosGunModel) {
        super(view, model);
    }

    //////////
    // Fire //
    //////////

    protected _getInitialForce(): Vector3 {
        return this._model.parent.forward.clone().normalize().scaleInPlace(this._model.force);
    }

    protected _initAudio(): SoundPlayer {
        return new SoundPlayer('laserGun', this._view.mesh, true);
    }
}
export default ChaosGunController;
