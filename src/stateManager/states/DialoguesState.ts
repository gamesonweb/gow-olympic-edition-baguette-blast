import CustomUI from '../../UI/CustomUI';
import Game from '../../game/Game';
import State from '../EnumState';
import BaseState from './BaseState';

class DialogueState extends BaseState {
    private _dialogue: string;

    constructor(dialogue: string) {
        super();
        this._dialogue = dialogue;
    }

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

        let s = State.Home;
        switch (this._dialogue) {
            case '1':
                s = State.Level1;
                break;
            case '2':
                s = State.Level2;
                break;
            case '3':
                s = State.Level3;
                break;
            case '4':
                s = State.Level4;
                break;
            case '5':
                s = State.Level5;
                break;
            case '6':
                s = State.Level6;
                break;
        }

        const panel = CustomUI.addPanel(1, 1);
        const panelimg = CustomUI.changePanel(this._dialogue);
        CustomUI.addButton('Back', State.SelectLevel, panel, panelimg, false, true);
        CustomUI.addButton('Start', s, panel, panelimg, false, true);
    }

    public update(deltaTime: number): void {
        deltaTime;
    }

    public dispose(): void {}
}

export default DialogueState;
