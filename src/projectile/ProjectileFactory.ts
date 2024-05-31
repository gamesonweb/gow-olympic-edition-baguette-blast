import { Vector3 } from '@babylonjs/core';
import { ProjectileType } from '../game/models/LevelData';
import BallController from './controllers/BallController';
import LaserController from './controllers/LaserController';
import BallModel from './models/BallModels';
import LaserModel from './models/LaserModel';
import BallView from './views/BallView';
import LaserView from './views/LaserView';
import EggView from './views/EggView';
import EggController from './controllers/EggController';
import EggModel from './models/EggModel';
import BoomerangController from './controllers/BoomerangController';
import BoomerangView from './views/BoomerangView';
import BoomerangModel from './models/BoomerangModel';
import JavelinController from './controllers/JavelinController';
import JavelinView from './views/JavelinView';
import JavelinModel from './models/JavelinModel';
import DiscController from './controllers/DiscController';
import DiscView from './views/DiscView';
import DiscModel from './models/DiscModel';
import ChaosBallController from './controllers/ChaosBallController';
import ChaosBallView from './views/ChaosBallView';
import ChaosBallModel from './models/ChaosBallModel';

class ProjectileFactory {
    /////////////////
    // Constructor //
    /////////////////

    private constructor() {
        // Private constructor to prevent instantiation
    }

    /////////////
    // Publics //
    /////////////

    public static createProjectile(
        type: ProjectileType,
        initialPosition: Vector3,
        initialSpeedVector: Vector3,
        initialOrientation: Vector3
    ): BallController | LaserController {
        switch (type) {
            case ProjectileType.Ball:
                return ProjectileFactory._createBall(initialPosition, initialSpeedVector, initialOrientation);
            case ProjectileType.Laser:
                return ProjectileFactory._createLaser(initialPosition, initialSpeedVector, initialOrientation);
            case ProjectileType.Egg:
                return ProjectileFactory._createEgg(initialPosition, initialSpeedVector, initialOrientation);
            case ProjectileType.Boomerang:
                return ProjectileFactory._createBoomerang(initialPosition, initialSpeedVector, initialOrientation);
            case ProjectileType.Javelin:
                return ProjectileFactory._createJavelin(initialPosition, initialSpeedVector, initialOrientation);
            case ProjectileType.Disc:
                return ProjectileFactory._createDisc(initialPosition, initialSpeedVector, initialOrientation);
            case ProjectileType.ChaosBall:
                return ProjectileFactory._createChaosBall(initialPosition, initialSpeedVector, initialOrientation);
            default:
                throw new Error(`Projectile type ${type} is not supported`);
        }
    }

    //////////////
    // Privates //
    //////////////

    private static _createBall(
        initialPosition: Vector3,
        initialSpeedVector: Vector3,
        initialOrientation: Vector3
    ): BallController {
        return new BallController(
            new BallView(),
            new BallModel(initialPosition, initialOrientation, initialSpeedVector)
        );
    }

    private static _createLaser(
        initialPosition: Vector3,
        initialSpeedVector: Vector3,
        initialOrientation: Vector3
    ): LaserController {
        return new LaserController(
            new LaserView(),
            new LaserModel(initialPosition, initialOrientation, initialSpeedVector)
        );
    }

    private static _createEgg(
        initialPosition: Vector3,
        initialSpeedVector: Vector3,
        initialOrientation: Vector3
    ): EggController {
        return new EggController(
            new EggView(),
            new EggModel(initialPosition, initialOrientation, initialSpeedVector)
        );
    }

    private static _createBoomerang(
        initialPosition: Vector3,
        initialSpeedVector: Vector3,
        initialOrientation: Vector3
    ): BoomerangController {
        return new BoomerangController(
            new BoomerangView(),
            new BoomerangModel(initialPosition, initialOrientation, initialSpeedVector)
        );
    }

    private static _createJavelin(
        initialPosition: Vector3,
        initialSpeedVector: Vector3,
        initialOrientation: Vector3
    ): JavelinController {
        return new JavelinController(
            new JavelinView(),
            new JavelinModel(initialPosition, initialOrientation, initialSpeedVector)
        );
    }

    private static _createDisc(
        initialPosition: Vector3,
        initialSpeedVector: Vector3,
        initialOrientation: Vector3
    ): DiscController {
        return new DiscController(
            new DiscView(),
            new DiscModel(initialPosition, initialOrientation, initialSpeedVector)
        );
    }

    private static _createChaosBall(
        initialPosition: Vector3,
        initialSpeedVector: Vector3,
        initialOrientation: Vector3
    ): ChaosBallController {
        return new ChaosBallController(
            new ChaosBallView(),
            new ChaosBallModel(initialPosition, initialOrientation, initialSpeedVector)
        );
    }
}

export { ProjectileFactory, ProjectileType };
