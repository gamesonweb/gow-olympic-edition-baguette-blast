import { Vector3 } from '@babylonjs/core';
import {
    AttractEnemyProperties,
    AvoidMeshMeshProperties,
    BehaviourData,
    BehaviourType,
    FloatingProperties,
    GravityProperties,
    MoveAtoBProperties,
    MoveFreelyInCubeProperties,
    RushProperties,
} from '../game/models/LevelData';
import LevelState from '../stateManager/states/LevelState';
import AttractEnemy from './AttractEnemy';
import AvoidMeshs from './AvoidMeshs';
import Floating from './Floating';
import Gravity from './Gravity';
import IBehaviour from './IBehaviour';
import MoveAtoB from './MoveAtoB';
import MoveFreelyInCube from './MoveFreelyInCube';
import Rush from './Rush';

class BehaviourFactory {
    public static createBehaviour(behaviorData: BehaviourData): IBehaviour {
        switch (behaviorData.type) {
            case BehaviourType.AttractEnemy:
                return BehaviourFactory._createAttractEnemy(behaviorData as AttractEnemyProperties);
            case BehaviourType.AvoidMesh:
                return BehaviourFactory._createAvoidMesh(behaviorData as AvoidMeshMeshProperties);
            case BehaviourType.Floating:
                return BehaviourFactory._createFloating(behaviorData as FloatingProperties);
            case BehaviourType.Gravity:
                return BehaviourFactory._createGravity(behaviorData as GravityProperties);
            case BehaviourType.MoveAtoB:
                return BehaviourFactory._createMoveAtoB(behaviorData as MoveAtoBProperties);
            case BehaviourType.MoveFreelyInCube:
                return BehaviourFactory._createMoveFreelyInCube(behaviorData as MoveFreelyInCubeProperties);
            case BehaviourType.Rush:
                return BehaviourFactory._createRush(behaviorData as RushProperties);
            default:
                throw new Error(`Unsupported behaviour type: ${behaviorData.type}`);
        }
    }

    private static _createAttractEnemy(properties: AttractEnemyProperties): IBehaviour {
        return new AttractEnemy(LevelState._enemiesController, properties.force, properties.radius);
    }

    private static _createAvoidMesh(properties: AvoidMeshMeshProperties): IBehaviour {
        return new AvoidMeshs(properties.force, properties.radius);
    }

    private static _createFloating(properties: FloatingProperties): IBehaviour {
        return new Floating(properties.force, properties.oscillationFreq);
    }

    private static _createGravity(properties: GravityProperties): IBehaviour {
        return new Gravity(properties.force);
    }

    private static _createMoveAtoB(properties: MoveAtoBProperties): IBehaviour {
        return new MoveAtoB(
            properties.force,
            properties.radius,
            new Vector3(properties.pointA.x, properties.pointA.y, properties.pointA.z),
            new Vector3(properties.pointB.x, properties.pointB.y, properties.pointB.z)
        );
    }

    private static _createMoveFreelyInCube(properties: MoveFreelyInCubeProperties): IBehaviour {
        return new MoveFreelyInCube(
            properties.force,
            properties.radius,
            new Vector3(properties.minPosition.x, properties.minPosition.y, properties.minPosition.z),
            new Vector3(properties.maxPosition.x, properties.maxPosition.y, properties.maxPosition.z)
        );
    }

    private static _createRush(properties: RushProperties): IBehaviour {
        return new Rush(properties.force);
    }
}

export default BehaviourFactory;
