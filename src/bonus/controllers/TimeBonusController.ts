import Game from '../../game/Game';
import TimeBonusModel from '../models/TimeBonusModel';
import TimeBonusView from '../views/TimeBonusView';
import BaseBonusController from './BaseBonusController';

class TimeBonusController extends BaseBonusController {
    // MVC
    protected _model: TimeBonusModel;
    protected _view: TimeBonusView;

    /////////////////
    // Constructor //
    /////////////////
    public constructor(model: TimeBonusModel, view: TimeBonusView) {
        super(model, view);
    }

    ////////////
    // Action //
    ////////////

    public activate(): void {
        super.activate();

        Game.instance.timeControl.activeSlowPower(this._model.speedRatio);

        // reset the slow power time to undefined to allow the slow power to be activated again
        setTimeout(() => {
            Game.instance.timeControl.disableSlowPower();
        }, this._model.duration * 1000);
    }
}

export default TimeBonusController;
