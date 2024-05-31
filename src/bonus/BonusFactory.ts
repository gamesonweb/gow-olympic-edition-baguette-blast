import { BonusData, BonusType, ScoreBonusData, TimeBonusData } from '../game/models/LevelData';
import BaseBonusController from './controllers/BaseBonusController';
import ScoreBonusController from './controllers/ScoreBonusController';
import TimeBonusController from './controllers/TimeBonusController';
import ScoreBonusModel from './models/ScoreBonusModel';
import TimeBonusModel from './models/TimeBonusModel';
import ScoreBonusView from './views/ScoreBonusView';
import TimeBonusView from './views/TimeBonusView';

class BonusFactory {
    /////////////////
    // Constructor //
    /////////////////

    // Private constructor to prevent instantiation
    private constructor() {}

    /////////////
    // Publics //
    /////////////

    public static createBonus(bonusData: BonusData): BaseBonusController {
        switch (bonusData.type) {
            case BonusType.Score:
                return BonusFactory._createScoreBonus(bonusData as ScoreBonusData);
            case BonusType.Time:
                return BonusFactory._createTimeBonus(bonusData as TimeBonusData);
            default:
                throw new Error(`Unknown bonus type: ${bonusData.type}`);
        }
    }

    //////////////
    // Privates //
    //////////////

    private static _createScoreBonus(bonusData: ScoreBonusData): BaseBonusController {
        // Extract data
        const score = bonusData.score ? bonusData.score : 10;

        // Create MVC
        const model = new ScoreBonusModel(score);
        const view = new ScoreBonusView();
        const controller = new ScoreBonusController(model, view);

        return controller;
    }

    private static _createTimeBonus(bonusData: TimeBonusData): BaseBonusController {
        // Extract data
        const duration = bonusData.duration ? bonusData.duration : 6;
        const speedRatio = bonusData.speedRatio ? bonusData.speedRatio : 0.5;

        // Create MVC
        const model = new TimeBonusModel(duration, speedRatio);
        const view = new TimeBonusView();
        const controller = new TimeBonusController(model, view);

        return controller;
    }
}

export default BonusFactory;
