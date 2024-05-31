import { SoundPlayer } from '../../game/controllers/SoundPlayer';
import WeaponController from '../../weapon/controllers/WeaponController';

class PlayerModel {
    private _weaponLeft: WeaponController;
    private _weaponRight: WeaponController;
    private _health: number;
    private _hitSound: SoundPlayer;

    ///////////////
    // Accessors //
    ///////////////

    set weaponLeft(weapon: WeaponController) {
        this._weaponLeft = weapon;
    }

    get weaponLeft(): WeaponController {
        return this._weaponLeft;
    }

    set weaponRight(weapon: WeaponController) {
        this._weaponRight = weapon;
    }

    get weaponRight(): WeaponController {
        return this._weaponRight;
    }

    set health(health: number) {
        this._health = health;
    }

    get health(): number {
        return this._health;
    }

    get hitSound(): SoundPlayer {
        return this._hitSound;
    }

    set hitSound(sound: SoundPlayer) {
        this._hitSound = sound;
    }

    ////////////
    // Weapon //
    ////////////

    public dropWeapon(hand: 'left' | 'right' | 'both'): void {
        if (hand === 'left' || hand === 'both') {
            this._weaponLeft?.dispose();
            this._weaponLeft = undefined;
        }

        if (hand === 'right' || hand === 'both') {
            this._weaponRight?.dispose();
            this._weaponRight = undefined;
        }
    }

    /////////////
    // Dispose //
    /////////////

    public dispose(): void {
        if (this._weaponLeft) {
            this._weaponLeft.dispose();
        }

        if (this._weaponRight) {
            this._weaponRight.dispose();
        }

        if (this._hitSound) {
            this._hitSound.stopAndDispose();
        }
    }
}

export default PlayerModel;
