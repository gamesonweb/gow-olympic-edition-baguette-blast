import BaseBonusModel from './BaseBonusModel';

class TimeBonusModel extends BaseBonusModel {
    private _duration: number;
    private _speedRatio: number;

    /////////////////
    // Constructor //
    /////////////////

    public constructor(duration: number, speedRatio: number) {
        super();
        this._duration = duration;
        this._speedRatio = speedRatio;
    }

    //////////////
    // Accessor //
    //////////////

    public get duration(): number {
        return this._duration;
    }

    public get speedRatio(): number {
        return this._speedRatio;
    }
}

export default TimeBonusModel;
