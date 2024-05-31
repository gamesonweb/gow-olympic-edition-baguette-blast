import { InstancedMesh } from '@babylonjs/core';
import Game from '../../game/Game';
import ProjectileView from './ProjectileView';

class BallView extends ProjectileView {
    public constructor() {
        super();
    }

    protected _createMesh(): InstancedMesh {
        return Game.instance.assetManager.getBulletInstance();
    }
}

export default BallView;
