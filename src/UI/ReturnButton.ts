import { Color3, Mesh, MeshBuilder, StandardMaterial, Vector3 } from '@babylonjs/core';
import Game from '../game/Game';
import Buttons from '../menu/buttons';
import State from '../stateManager/EnumState';

class ReturnButton implements ICollider {
    private _mesh: Mesh;

    /////////////////
    // Constructor //
    /////////////////
    public constructor(position: Vector3) {
        this._mesh = this._createMesh();

        // Set position
        this._mesh.position.copyFrom(position);

        // Attach click event with laser or mouse
        Buttons.clickable(Game.instance.scene, this._mesh, () => {
            this._action();
        });

        // Add collider to allow to be touched by the laser
        Game.instance.collisionManager.addCollider(this);
    }

    private _createMesh(): Mesh {
        // Create mesh
        const button = MeshBuilder.CreateBox('button', { width: 0.7, height: 0.1, depth: 0.7 }, Game.instance.scene);
        const base = MeshBuilder.CreateBox('button', { width: 1, height: 0.1, depth: 1 }, Game.instance.scene);
        base.position.y = -0.05;
        base.parent = button;

        // Create material
        const baseMaterial = new StandardMaterial('baseMaterial', Game.instance.scene);
        baseMaterial.diffuseColor = new Color3(0.2, 0.2, 0.2);
        base.material = baseMaterial;

        const buttonMaterial = new StandardMaterial('buttonMaterial', Game.instance.scene);
        buttonMaterial.diffuseColor = new Color3(0.8, 0, 0);
        button.material = buttonMaterial;

        return button;
    }

    ////////////
    // Action //
    ////////////

    private _action(): void {
        Game.instance.stateManager.changeState(State.Home);
    }

    ///////////////
    // Accessors //
    ///////////////

    public get mesh(): Mesh {
        return this._mesh;
    }

    //////////////
    // Collider //
    //////////////

    public collidesWith(): boolean {
        return false;
    }

    public onCollision(): void {
        this._action();
    }

    /////////////
    // Dispose //
    /////////////

    public dispose(): void {
        this._mesh.dispose();
        Game.instance.collisionManager.removeCollider(this);
    }
}

export default ReturnButton;
