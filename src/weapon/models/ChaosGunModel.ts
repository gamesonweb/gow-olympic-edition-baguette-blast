import { ProjectileType } from '../../projectile/ProjectileFactory';
import WeaponModel from './WeaponModel';

class ChaosGunModel extends WeaponModel {
    /////////////////
    // Constructor //
    /////////////////

    constructor(projectileType: ProjectileType, force: number, durability: number, cooldownSecond: number) {
        super(projectileType, force, durability, cooldownSecond);
    }
}
export default ChaosGunModel;
