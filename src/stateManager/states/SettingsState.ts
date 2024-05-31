import Game from '../../game/Game';
import CustomUI from '../../UI/CustomUI';
import State from '../EnumState';
import BaseState from './BaseState';

class SettingsState extends BaseState {

    public async init(): Promise<void> {
        this._scene = Game.instance.scene;
        this._setupCamera();
        this._setupGUI();
        return Promise.resolve();
    }

    private _setupCamera(): void {
        // const camera = Game.instance.cameraManager.playerCamera;
        // camera.position = new Vector3(-1.5, 3, 4);
        // camera.setTarget(new Vector3(-1.5, 3, 5));
    }

    private _setupGUI(): void {
        if (!this._scene) {
            console.error('Scene not initialized');
            return;
        }

        const panel = CustomUI.addPanel(1, 1);
        const panelimg = CustomUI.changePanel('settings');
        CustomUI.addButton('Back', State.Home, panel, panelimg, true);
    }

    public update(deltaTime: number): void { deltaTime; }

    public dispose(): void { }
}

export default SettingsState;