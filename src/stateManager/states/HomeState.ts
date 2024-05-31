import { Vector3 } from '@babylonjs/core';
import Game from '../../game/Game';
import CustomUI from '../../UI/CustomUI';
import State from '../EnumState';
import BaseState from './BaseState';

class HomeState extends BaseState {
    public async init(): Promise<void> {
        this._scene = Game.instance.scene;
        // this._setupCamera();
        // this._setupEnvironment();
        this._setupGUI();
        this._initAudio();
    }

    private _setupEnvironment(): void {
        const environment = Game.instance.environmentControllers;
        environment.cycleDuration = 1800;
        environment.pourcentageOfDay = Math.random();
    }

    private _setupCamera(): void {
        const camera = Game.instance.cameraManager.playerCamera;
        // camera.position = new Vector3(CustomUI.panelCenter.x, CustomUI.panelCenter.y, 4);
        camera.position = new Vector3(-0.74, 3.60, 5.22);
        // camera.setTarget(new Vector3(CustomUI.panelCenter.x, CustomUI.panelCenter.y, 5));
        camera.setTarget(new Vector3(-0.74, 3.59, 7.45));
    }

    private _initAudio(): void {
        Game.instance.mainTheme.play();
    }

    private _setupGUI(): void {
        if (!this._scene) {
            console.error('Scene not initialized');
            return;
        }

        const panel = CustomUI.addPanel(1, 3);
        panel.position.y = 3;
        panel.position.x = -1;
        const panelimg = CustomUI.changePanel('home');

        CustomUI.addButton('Select Level', State.SelectLevel, panel, panelimg);
        CustomUI.addButton('Settings', State.Settings, panel, panelimg);
        CustomUI.addButton('Credit', State.Credit, panel, panelimg);
    }

    public update(deltaTime: number): void {
        deltaTime;
    }

    public dispose(): void {}
}

export default HomeState;
