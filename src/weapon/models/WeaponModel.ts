import { AbstractMesh } from '@babylonjs/core';
import { SoundPlayer } from '../../game/controllers/SoundPlayer';
import ProjectileController from '../../projectile/controllers/ProjectileController';
import { ProjectileType } from '../../projectile/ProjectileFactory';

abstract class WeaponModel {
    private _force: number;
    private _durability: number;
    private _cooldownSecond: number;
    private _parent: AbstractMesh;
    private _projectileType: ProjectileType;
    private _projectiles: ProjectileController[];
    private _isGrabed: boolean;
    private _timeSinceLastShot: number;
    private _isDispose: boolean;
    private _canBeDisposed: boolean;
    private _fireSound: SoundPlayer;

    /////////////////
    // Constructor //
    /////////////////

    public constructor(projectileType: ProjectileType, force: number, durability: number, cooldownSecond: number) {
        this._projectileType = projectileType;
        this._force = force;
        this._durability = durability;
        this._cooldownSecond = cooldownSecond;
        this._parent = null;
        this._projectiles = [];
        this._isGrabed = false;
        this._timeSinceLastShot = 0;
        this._isDispose = false;
        this._canBeDisposed = false;
    }

    //////////////
    // Accessor //
    //////////////

    // Force
    public get force(): number {
        return this._force;
    }

    public set force(force: number) {
        this._force = force;
    }

    // Durability
    public get durability(): number {
        return this._durability;
    }

    public set durability(durability: number) {
        this._durability = durability;
    }

    // Cooldown
    public get cooldownSecond(): number {
        return this._cooldownSecond;
    }

    public set cooldownSecond(cooldownSecond: number) {
        this._cooldownSecond = cooldownSecond;
    }

    // Parent
    public get parent(): AbstractMesh {
        return this._parent;
    }

    public set parent(parent: AbstractMesh) {
        this._parent = parent;
    }

    // Projectile type
    public get projectileType(): ProjectileType {
        return this._projectileType;
    }

    public set projectileType(projectileType: ProjectileType) {
        this._projectileType = projectileType;
    }

    // Projectiles
    public get projectiles(): ProjectileController[] {
        return this._projectiles;
    }

    public set projectiles(projectiles: ProjectileController[]) {
        this._projectiles = projectiles;
    }

    // Grab
    public get isGrabed(): boolean {
        return this._isGrabed;
    }

    public set isGrabed(isGrabed: boolean) {
        this._isGrabed = isGrabed;
    }

    // Time since last shot
    public get timeSinceLastShot(): number {
        return this._timeSinceLastShot;
    }

    public set timeSinceLastShot(timeSinceLastShot: number) {
        this._timeSinceLastShot = timeSinceLastShot;
    }

    // Dispose
    public get isDisposed(): boolean {
        return this._isDispose;
    }

    public set isDisposed(isDisposed: boolean) {
        this._isDispose = isDisposed;
    }

    public get canBeDisposed(): boolean {
        return this._canBeDisposed;
    }

    public set canBeDisposed(canBeDisposed: boolean) {
        this._canBeDisposed = canBeDisposed;
    }

    // Fire sound
    public get fireSound(): SoundPlayer {
        return this._fireSound;
    }

    public set fireSound(fireSound: SoundPlayer) {
        this._fireSound = fireSound;
    }

    /////////////
    // Dispose //
    /////////////

    public dispose(): void {
        if (this._fireSound) {
            this._fireSound.stopAndDispose();
        }
    }
}
export default WeaponModel;
