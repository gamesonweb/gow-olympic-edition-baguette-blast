import { AbstractMesh } from '@babylonjs/core';
import Game from '../../game/Game';
import BaseBonusView from './BaseBonusView';

class ScoreBonusView extends BaseBonusView {
    protected _createMesh(): AbstractMesh {
        return Game.instance.assetManager.getBonusScoreInstance();
    }
}
export default ScoreBonusView;
