import BallModel from '../models/BallModels';
import BallView from '../views/BallView';
import ProjectileController from './ProjectileController';

class BallController extends ProjectileController {
    constructor(view: BallView, model: BallModel) {
        super(view, model);
    }
}

export default BallController;
