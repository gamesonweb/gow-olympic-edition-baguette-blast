import { Color4 } from '@babylonjs/core';
import Game from '../../game/Game';

class Sky {
    private _scene = Game.instance.scene;

    // Config
    private _skyColorDay = new Color4(0.53, 0.81, 0.98, 1); // Blue for day
    private _blackColor = new Color4(0, 0, 0, 1); // Black for night

    /////////////////
    // Constructor //
    /////////////////

    public constructor() {}

    ////////////
    // Update //
    ////////////

    public update(sunHeight: number): void {
        const ratio = sunHeight * 0.5 + 0.5; // Adjustment for a smoother transition

        this._scene.clearColor = new Color4(
            this._skyColorDay.r * ratio + this._blackColor.r * (1 - ratio),
            this._skyColorDay.g * ratio + this._blackColor.g * (1 - ratio),
            this._skyColorDay.b * ratio + this._blackColor.b * (1 - ratio),
            1
        );
    }
}

export default Sky;
