import { AbstractMesh } from '@babylonjs/core';

abstract class WeaponView {
    private _mesh: AbstractMesh;

    /////////////////
    // Constructor //
    /////////////////

    constructor() {
        this._mesh = this._createMesh();
    }

    /**
     * Create the mesh of the weapon
     *
     * @returns The mesh of the weapon
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
export default WeaponView;
