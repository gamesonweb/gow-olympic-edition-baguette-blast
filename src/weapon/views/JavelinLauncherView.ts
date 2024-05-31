import { AbstractMesh, Vector3 } from '@babylonjs/core';
import Game from '../../game/Game';
import GunView from './LaserGunView';

class JavelinLauncherView extends GunView {
    /////////////////
    // Constructor //
    /////////////////

    constructor() {
        super();
    }

    protected _createMesh(): AbstractMesh {
        const mesh = Game.instance.assetManager.getJavelinLauncherInstance();
        mesh.position = new Vector3(0, 0, 0.5);
        mesh.rotate(Vector3.Up(), -Math.PI / 2);

        return mesh;
    }
}
export default JavelinLauncherView;
