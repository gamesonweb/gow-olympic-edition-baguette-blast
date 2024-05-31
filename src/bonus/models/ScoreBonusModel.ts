import BaseBonusModel from './BaseBonusModel';

class ScoreBonusModel extends BaseBonusModel {
    private _score: number;

    /////////////////
    // Constructor //
    /////////////////

    constructor(score: number) {
        super();
        this._score = score;
    }

    //////////////
    // Accessor //
    //////////////

    public get score(): number {
        return this._score;
    }
}

export default ScoreBonusModel;
