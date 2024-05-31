import { Scene } from '@babylonjs/core';
import StateInterface from './StateInterface';
import { AdvancedDynamicTexture } from '@babylonjs/gui';

abstract class BaseState implements StateInterface {
    protected _scene: Scene;
    protected _gui: AdvancedDynamicTexture;

    abstract init(): Promise<void>;
    abstract update(deltaTime: number): void;
    abstract dispose(): void;
}
export default BaseState;
