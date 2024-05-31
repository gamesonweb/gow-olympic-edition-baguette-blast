import { AbstractMesh } from '@babylonjs/core';
import Game from '../../game/Game';
import BalloonView from './BalloonView';

class GoldBalloonView extends BalloonView {

    protected _createMesh(): AbstractMesh {
        return Game.instance.assetManager.getBalloonGoldInstance();
    }

    public update(): void {}
}
export default GoldBalloonView;
