import ScoreBonusModel from '../models/ScoreBonusModel';
import ScoreBonusView from '../views/ScoreBonusView';
import BaseBonusController from './BaseBonusController';

class ScoreBonusController extends BaseBonusController {
    // MVC
    protected _model: ScoreBonusModel;
    protected _view: ScoreBonusView;

    /////////////////
    // Constructor //
    /////////////////
    public constructor(model: ScoreBonusModel, view: ScoreBonusView) {
        super(model, view);
    }

    ////////////
    // Action //
    ////////////

    public activate(): void {
        super.activate();
        // Todo: Implement the action of the score bonus
        console.log('Score bonus activated');
    }
}

export default ScoreBonusController;
