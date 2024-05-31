import { Vector3 } from '@babylonjs/core';
import { ProjectileType } from '../../projectile/ProjectileFactory';
import WeaponModel from './WeaponModel';

class HandModel extends WeaponModel {
    private _savPosition: Vector3;
    private _savPositionTime: number;
    private _actualPosition: Vector3;
    private _timeSinceLastSave: number;

    /////////////////
    // Constructor //
    /////////////////

    constructor(projectileType: ProjectileType, force: number, durability: number, cooldownSecond: number) {
        super(projectileType, force, durability, cooldownSecond);
        this._timeSinceLastSave = 0;
    }

    //////////////
    // Accessor //
    //////////////

    // Save position
    public get savPosition(): Vector3 {
        return this._savPosition;
    }

    public set savPosition(savPosition: Vector3) {
        this._savPosition = savPosition;
    }

    // Save position time
    public get savPositionTime(): number {
        return this._savPositionTime;
    }

    public set savPositionTime(savPositionTime: number) {
        this._savPositionTime = savPositionTime;
    }

    // Actual position
    public get actualPosition(): Vector3 {
        return this._actualPosition;
    }

    public set actualPosition(actualPosition: Vector3) {
        this._actualPosition = actualPosition;
    }

    // Time since last save
    public get timeSinceLastSave(): number {
        return this._timeSinceLastSave;
    }

    public set timeSinceLastSave(timeSinceLastSave: number) {
        this._timeSinceLastSave = timeSinceLastSave;
    }
}
export default HandModel;
