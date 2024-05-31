import { AbstractMesh } from '@babylonjs/core';

abstract class BaseBonusView {
    protected _mesh: AbstractMesh;

    /////////////////
    // Constructor //
    /////////////////

    public constructor() {
        this._mesh = this._createMesh();
    }

    /**
     * Create the mesh of the bonus
     *
     * @returns The mesh of the bonus
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

    public dispose(): void {
        this._mesh.dispose();
    }
}

export default BaseBonusView;
