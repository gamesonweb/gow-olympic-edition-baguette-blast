import Game from '../../game/Game';
import AmbiantLight from '../views/AmbiantLight';
import Shadows from '../views/Shadows';
import Sky from '../views/Sky';
import Sun from '../views/Sun';

class EnvironmentControllers {
    private _scene = Game.instance.scene;

    // Day-night cycle
    private _cycleDuration: number = 60;
    private _timeElapsed: number = 0 + 15;

    // Sun
    private _sun: Sun;
    private _sunUpdate: boolean = true;

    // Shadow
    private _shadowsManager: Shadows;
    private _enableShadows: boolean = true;

    // Sky
    private _sky: Sky;
    private _skyUpdate: boolean = true;

    // Ambiant light
    private _ambiantLight: AmbiantLight;
    private _ambiantLightUpdate: boolean = true;

    /////////////////
    // Constructor //
    /////////////////

    public constructor() {
        this._sun = new Sun();
        this._shadowsManager = new Shadows(this._sun.sunLight);
        this._sky = new Sky();
        this._ambiantLight = new AmbiantLight();
    }

    ////////////////
    // Public API //
    ////////////////

    public set cycleDuration(duration: number) {
        this._cycleDuration = duration;
    }

    public set pourcentageOfDay(pourcentage: number) {
        this._timeElapsed = this._cycleDuration * pourcentage;
    }

    ////////////
    // Update //
    ////////////

    public update(deltaTime: number): void {
        this._timeElapsed += deltaTime;
        const dayProgress = (this._timeElapsed % this._cycleDuration) / this._cycleDuration;

        // Sun update
        if (this._sunUpdate) {
            this._sun.update(dayProgress);
        }

        // Shadow is updated automatically

        // Sky update
        if (this._skyUpdate) {
            this._sky.update(this._sun.height);
        }

        // Ambiant light update
        if (this._ambiantLightUpdate) {
            this._ambiantLight.update(this._sun.height);
        }
    }
}

export default EnvironmentControllers;
