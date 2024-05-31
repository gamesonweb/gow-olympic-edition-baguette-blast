import { AbstractMesh, Quaternion, Vector3 } from '@babylonjs/core';
import { SoundPlayer } from '../../game/controllers/SoundPlayer';
import Game from '../../game/Game';
import PigeonModel from '../models/PigeonModel';
import PigeonView from '../views/PigeonView';
import EnemyController from './EnemyController';

class PigeonController extends EnemyController {
    protected _model: PigeonModel;
    protected _view: PigeonView;

    /////////////////
    // Constructor //
    /////////////////

    public constructor(model: PigeonModel, view: PigeonView) {
        super(model, view);
    }

    protected _createHitbox(): AbstractMesh {
        return Game.instance.assetManager.createHitbox(this._view.mesh, 'polySurface71', this._model.hitboxPadding);
    }

    protected _initAudio(): SoundPlayer {
        return new SoundPlayer('pigeonDying', this._view.mesh, true);
    }

    //////////////
    // Accessor //
    //////////////

    public get type(): string {
        return 'Pigeon';
    }

    ////////////
    // Update //
    ////////////

    public update(deltaTime: number): void {
        super.update(deltaTime);

        // Pigon looks at the player
        // this._view.mesh.lookAt(Game.instance.player.positionHead);
        // this._view.mesh.rotate(Vector3.Up(), Math.PI);

        this._updateRotation(deltaTime);
    }

    private _updateRotation(deltaTime: number) {
        // Calculate the target direction
        const targetDirection = Game.instance.cameraManager.playerCamera.position
            .subtract(this._view.mesh.position)
            .normalize();

        // Calculate the horizontal rotation (left/right)
        const horizontalAngle =
            Math.atan2(targetDirection.z, targetDirection.x) + Math.PI / 2 + this._model.offsetHeadRotation;
        const horizontalRotation = Quaternion.RotationAxis(Vector3.Down(), horizontalAngle);

        // Calculate the vertical rotation (up/down)
        const verticalAngle = Math.asin(targetDirection.y);
        const verticalRotation = Quaternion.RotationAxis(Vector3.Right(), verticalAngle);

        // Combine horizontal and vertical rotation
        const targetRotation = horizontalRotation.multiply(verticalRotation);

        // Spherical interpolation between current and target rotation
        this._view.mesh.rotationQuaternion = Quaternion.Slerp(
            this._view.mesh.rotationQuaternion,
            targetRotation,
            this._model.headRotationSpeed * deltaTime
        );
    }
}

export default PigeonController;
