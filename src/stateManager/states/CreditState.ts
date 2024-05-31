import Game from '../../game/Game';
import CustomUI from '../../UI/CustomUI';
import State from '../EnumState';
import BaseState from './BaseState';

class CreditState extends BaseState {
    public async init(): Promise<void> {
        this._scene = Game.instance.scene;
        this._setupGUI();
        return Promise.resolve();
    }

    private _setupGUI(): void {
        if (!this._scene) {
            console.error('Scene not initialized');
            return;
        }

        const panel = CustomUI.addPanel(1, 1);
        const panelimg = CustomUI.changePanel('credit');
        CustomUI.addButton('Back', State.Home, panel, panelimg, true);
    }

    public update(deltaTime: number): void {
        deltaTime;
    }

    public dispose(): void {}
}

export default CreditState;
