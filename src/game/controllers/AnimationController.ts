import { AbstractMesh, Animatable, Scene } from '@babylonjs/core';
import Game from '../Game';

/**
 * The animation configuration.
 */
interface AnimationConfig {
    name: AnimationName;
    loop: boolean;
    speedRatio: number;
}

/**
 * The names of the animations.
 * These names are used to play animations on meshes.
 * The names are also used to identify animations in the animation controller.
 * @enum {string}
 */
enum AnimationName {
    pigeonQueue = 'polySurface72Action',
    pigeonLeftWing = 'polySurface73Action',
    pigeonRightWing = 'polySurface74Action',
    cylinderAction = 'CylinderAction',
}

/**
 * The animation controller.
 * This class is responsible for playing animations on meshes.
 */
class AnimationController {
    private _scene: Scene = Game.instance.scene;

    private readonly _animationConfigs: AnimationConfig[] = [
        { name: AnimationName.pigeonQueue, loop: true, speedRatio: 1 },
        { name: AnimationName.pigeonLeftWing, loop: true, speedRatio: 1 },
        { name: AnimationName.pigeonRightWing, loop: true, speedRatio: 1 },
        { name: AnimationName.cylinderAction, loop: true, speedRatio: 1 },
    ];

    private _animatables: Animatable[] = [];

    /**
     * Begins animation for the provided mesh and its child meshes recursively.
     *
     * @param {BABYLON.AbstractMesh} mesh - The mesh to animate.
     * @param {AnimationName} animationName - The name of the animation to play.
     * @param {boolean} loop - Whether the animation should loop.
     * @param {number} speedRatio - The speed ratio of the animation playback.
     * @returns {boolean} Whether the animation was found.
     */
    private _recursiveBeginAnimation(mesh, animationName: AnimationName, loop: boolean, speedRatio: number): boolean {
        const animationNames = mesh.animations.map((animation) => animation.name);

        // if (mesh.animations.length !== 0) {
        //     console.log('list of animations:', animationNames);
        // }

        let animationFound = false;

        if (animationNames.some((name) => name.includes(animationName))) {
            const animation = mesh.animations.find((animation) => animation.name.includes(animationName));
            const animationFrames = animation.getHighestFrame();

            const startFrame = speedRatio >= 0 ? 0 : animationFrames;
            const endFrame = speedRatio >= 0 ? animationFrames : 0;

            const animatable = this._scene.beginAnimation(mesh, startFrame, endFrame, loop, speedRatio);
            animatable.onAnimationEnd = () => {
                const index = this._animatables.indexOf(animatable);
                if (index !== -1) {
                    this._animatables.splice(index, 1);
                }
            };
            this._animatables.push(animatable);
            animationFound = true;
        }

        mesh.getChildren().forEach((childMesh) => {
            animationFound =
                this._recursiveBeginAnimation(childMesh, animationName, loop, speedRatio) || animationFound;
        });

        return animationFound;
    }

    /**
     * Plays the animation for the provided mesh.
     * @param {BABYLON.AbstractMesh} mesh - The mesh to animate.
     * @param {AnimationName} name - The name of the animation to play.
     * @param {boolean} playInReverse - Whether the animation should play in reverse.
     */
    public playAnimation(mesh: AbstractMesh, name: AnimationName, playInReverse: boolean = false): void {
        const config = this._animationConfigs.find((cfg) => cfg.name === name);
        if (config) {
            let speedRatio =
                (playInReverse ? -config.speedRatio : config.speedRatio) * Game.instance.timeControl.getTimeScale();

            // There is a bug in BabylonJS that causes an issue with the animation when the speed ratio is exactly 0.
            // To work around this bug, we set the speed ratio to a very low value.
            // This allows us to bypass the problem without significantly affecting the animation speed.
            if (speedRatio === 0) {
                speedRatio = playInReverse ? 1e-100 : -1e-100;
            }

            const animationFound = this._recursiveBeginAnimation(mesh, name, config.loop, speedRatio);
            if (!animationFound) {
                console.warn(`Animation "${name}" not found on mesh "${mesh.name}".`);
            }
        } else {
            console.warn(`Animation "${name}" not found or configuration not found for "${name}."`);
        }
    }

    /**
     * Updates the speed ratio of all animations.
     * @param {number} timeScale - The time scale to apply to the animations.
     */
    public updateSpeedRatio(timeScale: number): void {
        for (const animatable of Array.from(this._animatables)) {
            const animationNames = animatable.getAnimations().map((animation) => animation.animation.name);

            for (const name of animationNames) {
                const config = this._animationConfigs.find((cfg) => name.includes(cfg.name));

                if (config) {
                    const currentSpeed = animatable.speedRatio;
                    let updatedSpeed = (currentSpeed > 0 ? config.speedRatio : -config.speedRatio) * timeScale;

                    if (updatedSpeed === 0) {
                        updatedSpeed = currentSpeed > 0 ? 1e-100 : -1e-100;
                    }
                    animatable.speedRatio = updatedSpeed;
                }
            }
        }
    }
}

export { AnimationController, AnimationName };
