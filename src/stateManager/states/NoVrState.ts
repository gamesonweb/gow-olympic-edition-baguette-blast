import { Axis, Space, TransformNode, Vector3 } from '@babylonjs/core';
import { GUI3DManager, StackPanel3D } from '@babylonjs/gui';
import Game from '../../game/Game';
import UtilsUI from '../../UI/UtilsUI';
import State from '../EnumState';
import BaseState from './BaseState';

class NoVrState extends BaseState {
    private _mainPanel: StackPanel3D;
    private _anchor: TransformNode;
    private _manager: GUI3DManager;

    public async init(): Promise<void> {
        this._scene = Game.instance.scene;
        this._setupCamera();
        this._setupEnvironment();
        this._setupGUI();
        this._initAudio();

        // Set an escape with the key e to go to home state
        if (Game.instance.inputManager.leftSecondary.pressed) {
            Game.instance.stateManager.changeState(State.Home);
        }
    }

    private _setupEnvironment(): void {
        const environment = Game.instance.environmentControllers;
        environment.cycleDuration = 60 * 2;
        environment.pourcentageOfDay = Math.random();
    }

    private _setupCamera(): void {
        const camera = Game.instance.cameraManager.playerCamera;
        camera.position = new Vector3(-55, 24, 10);
        camera.setTarget(new Vector3(20, 5, 4));
        camera.detachControl();
    }

    private _initAudio(): void {
        Game.instance.mainTheme.play();
    }

    private _initAnchor(): void {
        // Create anchor transform node
        this._anchor = new TransformNode('anchorTuto');
        this._anchor.rotate(Axis.Y, Math.PI, Space.LOCAL);
        this._anchor.position = Game.instance.player.positionHead;
        this._mainPanel.linkToTransformNode(this._anchor);

        // Move in front of the player
        const headPositon = Game.instance.player.positionHead;
        const headDirection = Game.instance.cameraManager.playerCamera.getDirection(new Vector3(0, 0, 1));

        this._anchor.position = headPositon.add(headDirection.scale(5));

        // Rotate the panel to face the player
        this._anchor.lookAt(headPositon);

        // Mirror the panel
        this._anchor.rotate(Axis.Y, Math.PI, Space.LOCAL);
    }

    private _setupGUI(): void {
        // Create manager
        this._manager = new GUI3DManager(Game.instance.scene);

        // Create a main panel that will contain 3D UI
        this._mainPanel = new StackPanel3D();
        this._manager.addControl(this._mainPanel);

        // Create anchor transform node
        this._initAnchor();

        // Create TextBlock
        UtilsUI.createTextZone(
            // eslint-disable-next-line max-len
            'Bienvenue dans Baguette Blast ! Ce jeu ne peut être joué qu’avec un casque de réalité virtuelle, veuillez en enfiler un pour continuer.',
            this._mainPanel,
            5,
            0.5,
            40,
            Game.instance.scene
        );
    }

    public update(deltaTime: number): void {
        deltaTime;
    }

    public dispose(): void {
        this._mainPanel.dispose();
        this._manager.dispose();
        this._anchor.dispose();
    }
}

export default NoVrState;
