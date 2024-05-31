import { Vector3 } from '@babylonjs/core';
import { SoundPlayer } from '../../game/controllers/SoundPlayer';
import GunModel from '../models/GunModel';
import GunView from '../views/LaserGunView';
import WeaponController from './WeaponController';

class JavelinLauncherController extends WeaponController {
    /////////////////
    // Constructor //
    /////////////////

    constructor(view: GunView, model: GunModel) {
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
export default JavelinLauncherController;
