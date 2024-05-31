import { Vector3 } from '@babylonjs/core';
import Floating from '../../behaviors/Floating';
import IBehaviour from '../../behaviors/IBehaviour';
import BaseEnemyModel from './BaseEnemyModel';

class PigeonModel extends BaseEnemyModel {
    // Default behavior
    private _defaultBehavior: IBehaviour = new Floating(0.1, 0.2);

    // Head rotation
    private _offsetHeadRotation: number;
    private _headRotationSpeed: number;

    /////////////////
    // Constructor //
    /////////////////

    public constructor(position: Vector3, health: number, score: number, behavior: IBehaviour[] = []) {
        super(position, health, score, behavior);
        this._offsetHeadRotation = this._generateOffsetHeadRotation();
        this._headRotationSpeed = 1;

        // Behavior
        this.addBehavior(this._defaultBehavior);
    }

    private _generateOffsetHeadRotation(): number {
        return (Math.random() * Math.PI) / 2 - Math.PI / 4;
    }

    //////////////
    // Accessor //
    //////////////

    public get offsetHeadRotation(): number {
        return this._offsetHeadRotation;
    }

    public get headRotationSpeed(): number {
        return this._headRotationSpeed;
    }
}

export default PigeonModel;
