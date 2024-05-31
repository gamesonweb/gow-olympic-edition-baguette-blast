import { Mesh, MeshBuilder, Quaternion, TargetCamera, Vector3 } from '@babylonjs/core';
import Game from '../../game/Game';

class PlayerView {
    private _headHitbox: Mesh;
    private _bodyHitbox: Mesh;

    private _playerCamera: TargetCamera;

    /////////////////
    // Constructor //
    /////////////////

    public constructor() {
        this._playerCamera = Game.instance.cameraManager.playerCamera;
        this._initializePlayerMesh();
    }

    private _initializePlayerMesh(): void {
        // Create head mesh
        this._headHitbox = MeshBuilder.CreateBox(
            'player_head_HitBox',
            { width: 0.2, height: 0.2, depth: 0.025 },
            Game.instance.scene
        );

        // Create body mesh
        this._bodyHitbox = MeshBuilder.CreateBox(
            'player_body_HitBox',
            { width: 0.3, height: 0.3, depth: 0.3 },
            Game.instance.scene
        );

        // Set position
        this._headHitbox.parent = this._playerCamera;

        const bodyOffset = new Vector3(0, -0.42, -0.1);
        this._bodyHitbox.position = bodyOffset;

        // Set visibile
        this._headHitbox.isVisible = false;
        this._bodyHitbox.isVisible = false;
    }

    ///////////////
    // Accessors //
    ///////////////

    public set position(value: Vector3) {
        this._playerCamera.position = value;
    }

    public get position(): Vector3 {
        return this._headHitbox.position;
    }

    public get headHitbox(): Mesh {
        return this._headHitbox;
    }

    public get bodyHitbox(): Mesh {
        return this._bodyHitbox;
    }

    ////////////
    // Update //
    ////////////

    public update(): void {
        // Down of body always parallel to the ground
        const headRotationQuaternion = Quaternion.FromRotationMatrix(this._headHitbox.getWorldMatrix());
        const headYaw = headRotationQuaternion.toEulerAngles().y;
        const bodyRotation = Quaternion.FromEulerAngles(0, headYaw, 0);
        this._bodyHitbox.rotationQuaternion = bodyRotation;

        const bodyOffset = new Vector3(0, -0.42, -0.1);
        const rotatedBodyOffset = bodyOffset.rotateByQuaternionAroundPointToRef(
            headRotationQuaternion,
            Vector3.Zero(),
            new Vector3()
        );

        this._bodyHitbox.setAbsolutePosition(this._headHitbox.getAbsolutePosition().add(rotatedBodyOffset));
    }

    /////////////
    // Dispose //
    /////////////

    public dispose(): void {
        this._headHitbox.dispose();
        this._bodyHitbox.dispose();
    }
}

export default PlayerView;
