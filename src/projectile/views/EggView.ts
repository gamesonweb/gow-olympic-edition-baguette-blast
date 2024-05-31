import { InstancedMesh } from '@babylonjs/core';
import Game from '../../game/Game';
import ProjectileView from './ProjectileView';

class EggView extends ProjectileView {
    public constructor() {
        super();
    }

    protected _createMesh(): InstancedMesh {
        return Game.instance.assetManager.getEggInstance();
    }
}

export default EggView;
