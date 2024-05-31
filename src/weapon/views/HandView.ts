import { AbstractMesh, MeshBuilder } from '@babylonjs/core';
import WeaponView from './WeaponView';

class HandView extends WeaponView {
    /////////////////
    // Constructor //
    /////////////////

    constructor() {
        super();
    }

    protected _createMesh(): AbstractMesh {
        const mesh = MeshBuilder.CreateBox('hand', { size: 1.5 });
        return mesh;
    }
}
export default HandView;
