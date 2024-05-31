import { AbstractMesh } from '@babylonjs/core';
import Game from '../../game/Game';
import BalloonView from './BalloonView';

class CopperBalloonView extends BalloonView {

    protected _createMesh(): AbstractMesh {
        return Game.instance.assetManager.getBalloonBronzeInstance();
    }

    public update(): void {}
}
export default CopperBalloonView;
