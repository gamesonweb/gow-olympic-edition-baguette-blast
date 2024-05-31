import { AbstractMesh } from '@babylonjs/core';

abstract class BaseEnemyView {
    private _mesh: AbstractMesh;

    /////////////////
    // Constructor //
    /////////////////

    public constructor() {
        this._mesh = this._createMesh();
    }

    /**
     * Create the mesh of the projectile
     *
     * @returns The mesh of the projectile
     */
    protected abstract _createMesh(): AbstractMesh;

    //////////////
    // Accessor //
    //////////////

    public get mesh(): AbstractMesh {
        return this._mesh;
    }

    /////////////
    // Dispose //
    /////////////

    protected abstract _killAnimation(): void;

    public dispose(): void {
        this._killAnimation();
        this._mesh.dispose();
    }
}

export default BaseEnemyView;
