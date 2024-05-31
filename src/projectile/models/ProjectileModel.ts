import { AbstractMesh, Vector3 } from '@babylonjs/core';
import IBehaviour from '../../behaviors/IBehaviour';

abstract class ProjectileModel {
    // Mouvement
    private readonly _maxSpeed: number;
    private _behaviors: IBehaviour[];
    private _dampingFactor: number;
    private _speedVector: Vector3;
    private _position: Vector3;
    private _orientation: Vector3;

    // Time of life
    private readonly _maxTimeOfLife: number;
    private _timeOfLife: number;

    // Hitbox
    private _hitbox: AbstractMesh;
    private _hitboxPadding: number;

    // Dispose
    private _canBeDisposed;

    /////////////////
    // Constructor //
    /////////////////

    public constructor(
        initialPosition: Vector3,
        intialOrientation: Vector3,
        initialSpeedVector: Vector3,
        dampingFactor: number,
        _maxSpeed: number,
        _maxTimeOfLife: number,
        hitboxPadding: number,
        behavior: IBehaviour[]
    ) {
        // Initialize max values
        this._maxSpeed = _maxSpeed;
        this._maxTimeOfLife = _maxTimeOfLife;

        // Initialize mouvement variables
        this._speedVector = initialSpeedVector;
        this._position = initialPosition;
        this._orientation = intialOrientation;

        // Initialize hitbox
        this._hitboxPadding = hitboxPadding;

        // Initialize behaviors
        this._behaviors = behavior;

        // Initialize dispose
        this._canBeDisposed = false;

        // Initialize time of life
        this._timeOfLife = 0;

        // Initialize damping factor
        this._dampingFactor = dampingFactor;
    }

    //////////////
    // Accessor //
    //////////////

    // Speed vector
    public get speedVector(): Vector3 {
        return this._speedVector;
    }

    public set speedVector(speedVector: Vector3) {
        this._speedVector = speedVector;
    }

    // Position
    public get position(): Vector3 {
        return this._position;
    }

    public set position(position: Vector3) {
        this._position = position;
    }

    // Orientation
    public get orientation(): Vector3 {
        return this._orientation;
    }

    public set orientation(orientation: Vector3) {
        this._orientation = orientation;
    }

    // Hitbox
    public get hitbox(): AbstractMesh {
        return this._hitbox;
    }

    public set hitbox(hitbox: AbstractMesh) {
        this._hitbox = hitbox;
    }

    // Time of life
    public get timeOfLife(): number {
        return this._timeOfLife;
    }

    public set timeOfLife(timeOfLife: number) {
        this._timeOfLife = timeOfLife;
    }

    // Dispose
    public get canBeDisposed(): boolean {
        return this._canBeDisposed;
    }

    public set canBeDisposed(isDisposed: boolean) {
        this._canBeDisposed = isDisposed;
    }

    // Hitbox padding
    public get hitboxPadding(): number {
        return this._hitboxPadding;
    }

    // Behaviors
    public get behaviors(): IBehaviour[] {
        return this._behaviors;
    }

    // Max speed
    public get maxSpeed(): number {
        return this._maxSpeed;
    }

    // Max time of life
    public get maxTimeOfLife(): number {
        return this._maxTimeOfLife;
    }

    // Damping factor
    public get dampingFactor(): number {
        return this._dampingFactor;
    }

    /////////////
    // Dispose //
    /////////////

    public dispose(): void {
        this._hitbox.dispose();
    }
}
export default ProjectileModel;
