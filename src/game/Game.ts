import { Engine, Scene, WebXRDefaultExperience, WebXRSessionManager } from '@babylonjs/core';
import { Inspector } from '@babylonjs/inspector';
import DebugConsole from '../debug/DebugConsole';
import EnvironmentControllers from '../environment/controllers/EnvironmentControllers';
import InputManager from '../inputs/InputManager';
import KeyboardInput from '../inputs/KeyboardInput';
import QuestInput from '../inputs/QuestInput';
import PlayerController from '../player/controllers/PlayerController';
import PlayerModel from '../player/models/PlayerModels';
import PlayerView from '../player/views/PlayerViews';
import State from '../stateManager/EnumState';
import StateManager from '../stateManager/StateManager';
import { AnimationController } from './controllers/AnimationController';
import { default as AssetManager, default as AssetsLoader } from './controllers/AssetsLoader';
import CameraManager from './controllers/CameraManager';
import CollisionManager from './controllers/CollisionManager';
import { SoundPlayer } from './controllers/SoundPlayer';
import TimeControl from './controllers/TimeControl';

/**
 * The Game class is the central class of the application.
 * It encapsulates the main components such as the engine, scene, input management,
 * camera management, state management, and XR support.
 * It is responsible for initializing these components and managing the game loop.
 */
class Game {
    private static _instance: Game;

    // Activate or deactivate debug mode.
    private _debug = false;

    // The Babylon.js engine used for rendering.
    private _engine: Engine;

    // The Babylon.js scene where all the objects are rendered.
    private _scene: Scene;

    // The XR experience for VR support.
    private _xr: WebXRDefaultExperience;

    // Indicates if VR is supported on the current device.
    private _supportedVR: boolean;

    // Manages the different states of the game, like menu, playing, etc.
    private _stateManager: StateManager;

    // Manages the camera and its settings.
    private _cameraManager: CameraManager;

    // Manages input from different sources like keyboard or VR controllers.
    private _inputManager: InputManager;

    // Manages the loading of assets like models, textures, etc.
    private _assetManager: AssetManager;

    // Manages the environement, like lights, shadows, etc.
    private _environmentControllers: EnvironmentControllers;

    // Controls the simulation time, allowing pausing, slow motion, etc.
    private _timeControl: TimeControl;

    // A console for displaying debug information.
    private _debugConsole: DebugConsole;

    // The sounds used in the game.
    private _sounds: SoundPlayer[];

    // The player controller.
    private _player: PlayerController;

    // Collision manager.
    private _collisionManager: CollisionManager;

    // Annimation manager.
    private _animationManager: AnimationController;

    // Main theme music
    private _mainTheme: SoundPlayer;

    /////////////////
    // Constructor //
    /////////////////

    private constructor(canvas: HTMLCanvasElement) {
        // Create the Babylon.js engine.
        this._engine = new Engine(canvas, true);
        window.addEventListener('resize', () => this._engine.resize());

        // Initialize the game components and start the rendering loop.
        this._init().then(() => {
            // this.stateManager.changeState(State.Home);

            if (this._supportedVR) {
                this._stateManager.changeState(State.Bienvenue);
            } else {
                if (this._debug) {
                    this._stateManager.changeState(State.Bienvenue);
                } else {
                    this._stateManager.changeState(State.NoVr);
                }
            }

            this._render();
        });
    }

    private async _init(): Promise<void> {
        // Create the Babylon.js scene.
        this._scene = new Scene(this._engine);

        // Initialize the XR experience for VR support.
        this._supportedVR = await WebXRSessionManager.IsSessionSupportedAsync('immersive-vr');

        if (this._supportedVR) {
            this._xr = await this._scene.createDefaultXRExperienceAsync({});
        }

        // Initialize the collision manager.
        this._collisionManager = new CollisionManager();

        // Load assets using the asset manager.
        this._assetManager = new AssetsLoader();
        await this._assetManager.initialize();

        // Initialize the sounds.
        this._sounds = [];
        this._mainTheme = new SoundPlayer('music_theme');
        this._mainTheme.setAutoplay(true);
        this._mainTheme.setLoop(true);

        // Initialize other components of the game.
        this._cameraManager = new CameraManager(this._xr, this._supportedVR);
        this._inputManager = this._supportedVR ? new QuestInput(this._xr, this._scene) : new KeyboardInput(this._scene);
        this._environmentControllers = new EnvironmentControllers();
        this._stateManager = new StateManager();
        this._timeControl = new TimeControl();
        this._debugConsole = new DebugConsole();
        this._player = new PlayerController(new PlayerModel(), new PlayerView());
        this._animationManager = new AnimationController();

        // Debug mode
        if (this._debug) {
            Inspector.Show(this._scene, {});
        }
    }

    ///////////////
    // Singleton //
    ///////////////

    /**
     * Initializes the Game singleton instance.
     * @param canvas - The HTML canvas element where the game will be rendered.
     * @returns The Game instance.
     */
    public static buildInstance(canvas: HTMLCanvasElement): Game {
        if (!Game._instance) {
            Game._instance = new Game(canvas);
        }
        return Game._instance;
    }

    /**
     * Provides access to the singleton instance of the Game.
     * @returns The Game instance.
     * @throws Error if the Game instance is not initialized.
     */
    public static get instance(): Game {
        if (!Game._instance) {
            throw new Error('Game instance not initialized. Call Game.init() first.');
        }
        return Game._instance;
    }

    public static set score(score: number) {
        Game.instance.debugConsole.updateScore(score);
    }

    /////////////////
    // Render loop //
    /////////////////

    /**
     * Renders the scene and manages the game loop.
     */
    private _render(): void {
        let lastTime = window.performance.now();

        // Gérer la visibilité de l'onglet
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                lastTime = window.performance.now();
            } else {
                lastTime = null;
            }
        });

        // Gérer le focus et le blur de la fenêtre
        window.addEventListener('blur', () => {
            lastTime = null;
        });
        window.addEventListener('focus', () => {
            if (!lastTime) {
                lastTime = window.performance.now();
            }
        });

        // Gérer la minimisation et le changement de fenêtre
        window.addEventListener('pagehide', () => {
            lastTime = null;
        });
        window.addEventListener('pageshow', () => {
            if (!lastTime) {
                lastTime = window.performance.now();
            }
        });
        window.addEventListener('freeze', () => {
            lastTime = null;
        });
        window.addEventListener('resume', () => {
            if (!lastTime) {
                lastTime = window.performance.now();
            }
        });

        const maxStep = 0.1; // Limite le deltaTime à 0.1 seconde pour éviter les grands sauts
        this._engine.runRenderLoop(() => {
            const currentTime = window.performance.now();
            if (lastTime) {
                let deltaTime = (currentTime - lastTime) / 1000.0;
                deltaTime = Math.min(deltaTime, maxStep); // Limiter le deltaTime
                deltaTime *= this._timeControl.getTimeScale();

                lastTime = currentTime;
                if (document.visibilityState === 'visible') {
                    this._timeControl.update();
                    this._stateManager.currentState.update(deltaTime);
                    this._environmentControllers.update(deltaTime);
                    this._debugConsole.update(this._engine.getFps().toFixed() + ' fps');
                    this._cameraManager.update();
                    this._player.update(deltaTime);
                    this._scene.render();
                }
            }
        });
    }

    ///////////////
    // Accessors //
    ///////////////

    public get supportedVR(): boolean {
        return this._supportedVR;
    }

    public get sounds(): SoundPlayer[] {
        return this._sounds;
    }

    public get mainTheme(): SoundPlayer {
        return this._mainTheme;
    }

    public set sounds(sound: SoundPlayer[]) {
        this._sounds = sound;
    }

    public get stateManager(): StateManager {
        return this._stateManager;
    }

    public get debugConsole(): DebugConsole {
        return this._debugConsole;
    }

    public get inputManager(): InputManager {
        return this._inputManager;
    }

    public get timeControl(): TimeControl {
        return this._timeControl;
    }

    public get cameraManager(): CameraManager {
        return this._cameraManager;
    }

    public get assetManager(): AssetManager {
        return this._assetManager;
    }

    public get scene(): Scene {
        return this._scene;
    }

    public get player(): PlayerController {
        return this._player;
    }

    public get collisionManager(): CollisionManager {
        return this._collisionManager;
    }

    public get animationManager(): AnimationController {
        return this._animationManager;
    }

    public get environmentControllers(): EnvironmentControllers {
        return this._environmentControllers;
    }
}

export default Game;
