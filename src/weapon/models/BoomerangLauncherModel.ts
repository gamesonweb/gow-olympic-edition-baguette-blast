import { ProjectileType } from '../../projectile/ProjectileFactory';
import WeaponModel from './WeaponModel';

class BoomerangLauncherModel extends WeaponModel {
    /////////////////
    // Constructor //
    /////////////////

    constructor(projectileType: ProjectileType, force: number, durability: number, cooldownSecond: number) {
        super(projectileType, force, durability, cooldownSecond);
    }
}
export default BoomerangLauncherModel;
