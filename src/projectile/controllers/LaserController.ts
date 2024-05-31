import LaserModel from '../models/LaserModel';
import LaserView from '../views/LaserView';
import ProjectileController from './ProjectileController';

class LaserController extends ProjectileController {
    constructor(view: LaserView, model: LaserModel) {
        super(view, model);
    }
}

export default LaserController;
