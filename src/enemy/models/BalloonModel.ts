import Floating from '../../behaviors/Floating';
import IBehaviour from '../../behaviors/IBehaviour';
import BaseBonusController from '../../bonus/controllers/BaseBonusController';
import BaseEnemyModel from './BaseEnemyModel';

class BalloonModel extends BaseEnemyModel {
    // Default behavior
    private _defaultBehavior: IBehaviour = new Floating(0.08, 0.5);

    // Bonus
    private _bonusController: BaseBonusController;
    private _bonusOffsetY: number;

    /////////////////
    // Constructor //
    /////////////////

    public constructor(
        position,
        health,
        score,
        behavior: IBehaviour[] = [],
        maxSpeed = 20,
        dampingFactor = 0.98,
        hitboxPadding = 0.1,
        bonusOffsetY = -2.5
    ) {
        super(position, health, score, behavior, maxSpeed, dampingFactor, hitboxPadding);

        // Behavior
        this.addBehavior(this._defaultBehavior);

        // Bonus
        this._bonusOffsetY = bonusOffsetY;
    }

    //////////////
    // Accessor //
    //////////////

    // Bonus controller
    public get bonusController(): BaseBonusController {
        return this._bonusController;
    }

    public set bonusController(bonusController: BaseBonusController) {
        this._bonusController = bonusController;
    }

    // Bonus offset Y
    public get bonusOffsetY(): number {
        return this._bonusOffsetY;
    }

}

export default BalloonModel;
