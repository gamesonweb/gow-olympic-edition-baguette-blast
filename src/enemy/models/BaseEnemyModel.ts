import { AbstractMesh, Vector3 } from '@babylonjs/core';
import IBehaviour from '../../behaviors/IBehaviour';
import { SoundPlayer } from '../../game/controllers/SoundPlayer';

abstract class BaseEnemyModel {
    // Mouvement
    private readonly _maxSpeed: number;
    private _dampingFactor: number;
    private _behaviours: IBehaviour[];
    private _speedVector: Vector3;
    private _position: Vector3;

    // Hitbox
    private _hitbox: AbstractMesh;
    private _hitboxPadding: number;

    // Stats
    private _health: number;
    private _score: number;

    // Sound
    private _deathSound: SoundPlayer;

    // Dispose
    private _canBeDisposed: boolean;

    /////////////////
    // Constructor //
    /////////////////

    public constructor(
        position: Vector3,
        health: number,
        score: number,
        behaviors: IBehaviour[] = [],
        maxSpeed = 20,
        dampingFactor = 0.98,
        hitboxPadding = 0.1
    ) {
        // Mouvement
        this._maxSpeed = maxSpeed;
        this._dampingFactor = dampingFactor;
        this._behaviours = behaviors;
        this._speedVector = Vector3.Zero();
        this._position = position;

        // Hitbox
        this._hitboxPadding = hitboxPadding;

        // Stats
        this._health = health;
        this._score = score;

        // Dispose
        this._canBeDisposed = false;
    }

    //////////////
    // Accessor //
    //////////////

    // Max speed
    public get maxSpeed(): number {
        return this._maxSpeed;
    }

    // Damping factor
    public get dampingFactor(): number {
        return this._dampingFactor;
    }

    // Behaviors
    public get behaviors(): IBehaviour[] {
        return this._behaviours;
    }

    protected addBehavior(behavior: IBehaviour): void {
        if (!Array.isArray(this._behaviours)) {
            this._behaviours = [];
        }
        this._behaviours.push(behavior);
    }

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

    // Hitbox
    public get hitbox(): AbstractMesh {
        return this._hitbox;
    }

    public set hitbox(hitbox: AbstractMesh) {
        this._hitbox = hitbox;
    }

    // Hitbox padding
    public get hitboxPadding(): number {
        return this._hitboxPadding;
    }

    // Health
    public get health(): number {
        return this._health;
    }

    public set health(health: number) {
        this._health = health;
    }

    // Score
    public get score(): number {
        return this._score;
    }

    public set score(score: number) {
        this._score = score;
    }

    // Dispose
    public get canBeDisposed(): boolean {
        return this._canBeDisposed;
    }

    public set canBeDisposed(isDisposed: boolean) {
        this._canBeDisposed = isDisposed;
    }

    // Sound
    public get deathSound(): SoundPlayer {
        return this._deathSound;
    }

    public set deathSound(deathSound: SoundPlayer) {
        this._deathSound = deathSound;
    }

    /////////////
    // Dispose //
    /////////////

    public dispose(): void {
        if (this._hitbox) {
            this._hitbox.dispose();
        }

        if (this._deathSound) {
            // wait 4s before disposing the sound
            setTimeout(() => {
                this._deathSound.stopAndDispose();
            }, 4000);
        }
    }
}

export default BaseEnemyModel;
