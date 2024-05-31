import { AbstractMesh } from '@babylonjs/core';
import Game from '../../game/Game';
import BalloonView from './BalloonView';

class SilverBalloonView extends BalloonView {

    protected _createMesh(): AbstractMesh {
        return Game.instance.assetManager.getBalloonSilverInstance();
    }

    public update(): void {}
}
export default SilverBalloonView;
