import { Vector3 } from '@babylonjs/core';
import CustomUI from '../../UI/CustomUI';
import Game from '../../game/Game';
import State from '../EnumState';
import BaseState from './BaseState';

class LooseState extends BaseState {
    constructor() {
        super();
    }

    public async init(): Promise<void> {
        this._scene = Game.instance.scene;
        this._setupCamera();
        this._setupGUI();
        return Promise.resolve();
    }

    private _setupCamera(): void {
        const camera = Game.instance.cameraManager.playerCamera;
        camera.position = new Vector3(CustomUI.panelCenter.x, CustomUI.panelCenter.y, 4);
        camera.setTarget(new Vector3(CustomUI.panelCenter.x, CustomUI.panelCenter.y, 5));
    }

    private _setupGUI(): void {
        if (!this._scene) {
            console.error('Scene not initialized');
            return;
        }

        const panel = CustomUI.addPanel(1, 1);
        const panelimg = CustomUI.changePanel('loose');
        CustomUI.addButton('Level Select', State.SelectLevel, panel, panelimg, true);
    }

    public update(deltaTime: number): void {
        deltaTime;
    }

    public dispose(): void {}
}
export default LooseState;
