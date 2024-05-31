import { AbstractMesh, Vector3 } from '@babylonjs/core';
import { AnimationName } from '../../game/controllers/AnimationController';
import Game from '../../game/Game';
import GunView from './LaserGunView';

class BallGatlingView extends GunView {
    /////////////////
    // Constructor //
    /////////////////

    constructor() {
        super();
    }

    protected _createMesh(): AbstractMesh {
        const mesh = Game.instance.assetManager.getBallGatlingInstance();
        mesh.position = new Vector3(0, 0, 0.5);
        mesh.rotate(Vector3.Up(), -Math.PI / 2);

        Game.instance.animationManager.playAnimation(mesh, AnimationName.cylinderAction);
        Game.instance.scene.beginAnimation(mesh, 0, 100, true, 1);

        return mesh;
    }
}

export default BallGatlingView;
