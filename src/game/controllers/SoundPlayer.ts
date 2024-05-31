import { AbstractMesh, Engine, Sound } from '@babylonjs/core';
import data from '../../../public/assets/sounds/sounds.json';
import Game from '../../game/Game';

export class SoundPlayer {
    private _id: string;
    private _mesh: AbstractMesh;
    private _sound: Sound;

    private _curentTime: number = 0;

    public constructor(name: string, mesh: AbstractMesh = null, addInList: boolean = true) {
        // Get sound data
        const soundData = data[name];

        // Create sound
        this._sound = new Sound(name, soundData.file, Game.instance.scene, null);

        // Activate spatial sound
        if (soundData.spatialized && mesh !== null) {
            this._sound.spatialSound = true;
            this._mesh = mesh;
            this._sound.attachToMesh(this._mesh);
        }

        // Set volume
        this._sound.setVolume(soundData.volume);

        // Add sound to Game.sounds
        if (addInList) {
            Game.instance.sounds.push(this);
        }

        // Set id
        Engine.audioEngine.audioContext.resume();
    }

    public setAutoplay(bool: boolean) {
        this._sound.autoplay = bool;
    }

    public setLoop(bool: boolean): void {
        this._sound.loop = bool;
    }

    public setPitch(rate: number) {
        this._sound.setPlaybackRate(rate);
    }

    public play(ignoreIsPlaying: boolean = false): void {
        if (this._sound.isPaused) {
            this._sound.setPlaybackRate(1);
            this._sound.play(0, this._curentTime);
        } else if (ignoreIsPlaying) {
            this._sound.play();
        } else if (!this._sound.isPlaying) {
            this._sound.play();
        }
    }

    public pause(): void {
        this._sound.pause();
        this._curentTime = this._sound.currentTime;
    }

    public stopAndDispose(): void {
        if (this._mesh !== undefined) {
            this._sound.detachFromMesh();
        }
        this._sound.stop();
        this._sound.dispose();
        // update Game.sounds
        const index = Game.instance.sounds.indexOf(this);
        if (index !== -1) {
            Game.instance.sounds.splice(index, 1);
        }
    }
}
