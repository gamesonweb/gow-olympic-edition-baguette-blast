import { Color3, HemisphericLight, Vector3 } from '@babylonjs/core';
import Game from '../../game/Game';

class AmbiantLight {
    private _scene = Game.instance.scene;

    // Light
    private _light: HemisphericLight;

    // Config
    private _direction = new Vector3(0, 1, 0);
    private _nightColor = new Color3(0.1, 0.1, 0.4);
    private _dayColor = new Color3(1, 1, 1);
    private _intensity = 0.8;

    // Constructor
    public constructor() {
        this._light = new HemisphericLight('light', this._direction, this._scene);
        this._light.intensity = this._intensity;
    }

    // Update
    public update(sunHeight: number): void {
        const ratio = sunHeight * 0.5 + 0.5; // Adjustment for a smoother transition

        // Interpolate between day and night colors
        const r = this._nightColor.r * (1 - ratio) + this._dayColor.r * ratio;
        const g = this._nightColor.g * (1 - ratio) + this._dayColor.g * ratio;
        const b = this._nightColor.b * (1 - ratio) + this._dayColor.b * ratio;
        this._light.diffuse = new Color3(r, g, b);
    }
}

export default AmbiantLight;
