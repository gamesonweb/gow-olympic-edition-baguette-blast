import { InstancedMesh } from '@babylonjs/core';
import Game from '../../game/Game';
import ProjectileView from './ProjectileView';

class LaserView extends ProjectileView {
    public constructor() {
        super();
    }

    protected _createMesh(): InstancedMesh {
        return Game.instance.assetManager.getRandomBallInstance();
    }
}

export default LaserView;
