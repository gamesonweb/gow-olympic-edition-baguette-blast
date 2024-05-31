import { InstancedMesh } from '@babylonjs/core';

abstract class ProjectileView {
    private _mesh: InstancedMesh;

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
    protected abstract _createMesh(): InstancedMesh;

    //////////////
    // Accessor //
    //////////////

    public get mesh(): InstancedMesh {
        return this._mesh;
    }

    /////////////
    // Dispose //
    /////////////

    public dispose(): void {
        this._mesh.dispose();
    }
}
export default ProjectileView;
