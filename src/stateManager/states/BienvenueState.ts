import { Vector3 } from '@babylonjs/core';
import Game from '../../game/Game';
import CustomUI from '../../UI/CustomUI';
import State from '../EnumState';
import BaseState from './BaseState';

class BienvenueState extends BaseState {
    public async init(): Promise<void> {
        this._scene = Game.instance.scene;
        this._setupGUI();
        this._setupCamera();
        return Promise.resolve();
    }

    private _setupGUI(): void {
        if (!this._scene) {
            console.error('Scene not initialized');
            return;
        }

        const panel = CustomUI.addPanel(1, 1);
        const panelimg = CustomUI.changePanel('bienvenue');
        CustomUI.addButton('Let s Gooo!', State.Home, panel, panelimg, true);
    }

    private _setupCamera(): void {
        const camera = Game.instance.cameraManager.playerCamera;
        // camera.position = new Vector3(CustomUI.panelCenter.x, CustomUI.panelCenter.y, 4);
        camera.position = new Vector3(-0.74, 3.60, 5.22);
        // camera.setTarget(new Vector3(CustomUI.panelCenter.x, CustomUI.panelCenter.y, 5));
        camera.setTarget(new Vector3(-0.74, 3.59, 7.45));
    }

    public update(deltaTime: number): void {
        deltaTime;
    }

    public dispose(): void {}
}

export default BienvenueState;
