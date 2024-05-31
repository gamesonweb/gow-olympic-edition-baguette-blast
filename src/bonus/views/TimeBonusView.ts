import { AbstractMesh } from '@babylonjs/core';
import Game from '../../game/Game';
import BaseBonusView from './BaseBonusView';

class TimeBonusView extends BaseBonusView {
    protected _createMesh(): AbstractMesh {
        return Game.instance.assetManager.getBonusTimeInstance();
    }
}
export default TimeBonusView;
