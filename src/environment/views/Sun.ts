import { Color3, DirectionalLight, Vector3 } from '@babylonjs/core';
import Game from '../../game/Game';


class Sun {
    private _scene = Game.instance.scene;

    // Sun
    private _sunLight: DirectionalLight;
    private _height: number = 0;

    // Config
    private _startDirection: Vector3 = new Vector3(-1, -2, -1);
    private _intensity: number = 1;
    private _position: Vector3 = new Vector3(100, 40, 20);

    /////////////////
    // Constructor //
    /////////////////

    public constructor() {
        this._sunLight = this._createSunLight();
    }

    private _createSunLight(): DirectionalLight {
        const direction = this._startDirection;
        const light = new DirectionalLight('sun', direction, this._scene);
        light.intensity = this._intensity;
        light.position = this._position;

        return light;
    }

    ///////////////
    // Accessors //
    ///////////////

    public get sunLight(): DirectionalLight {
        return this._sunLight;
    }

    public get height(): number {
        return this._height;
    }

    ////////////
    // Update //
    ////////////

    public update(dayProgress: number): void {
        // Full circle for one complete day-night cycle
        const angle = dayProgress * 2 * Math.PI;

        // Height calculation for a smoother transition
        const height = Math.cos(angle);

        const radius = 100; // Distance from the center of the scene
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);

        // Update sun's position
        this._sunLight.position = new Vector3(x, height * 50 + 50, z);
        this._sunLight.setDirectionToTarget(Vector3.Zero());

        // Update intensity smoothly
        this._sunLight.intensity = (1 + height) * 0.5;

        // Linear interpolation for a smooth transition of the sun's color
        const colorDay = new Color3(1, 1, 0.8); // White-yellow during the day
        const colorDuskDawn = new Color3(1, 0.5, 0); // Orange at sunrise and sunset
        const ratio = height; // Linear ratio between the two colors

        this._sunLight.diffuse = new Color3(
            colorDuskDawn.r * (1 - ratio) + colorDay.r * ratio,
            colorDuskDawn.g * (1 - ratio) + colorDay.g * ratio,
            colorDuskDawn.b * (1 - ratio) + colorDay.b * ratio
        );

        // Update height
        this._height = height;
    }
}

export default Sun;
