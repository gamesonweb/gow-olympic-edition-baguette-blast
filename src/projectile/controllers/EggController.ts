import EggModel from '../models/EggModel';
import EggView from '../views/EggView';
import ProjectileController from './ProjectileController';

class EggController extends ProjectileController {
    constructor(view: EggView, model: EggModel) {
        super(view, model);
    }
}

export default EggController;
