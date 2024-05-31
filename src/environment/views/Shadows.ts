import { DirectionalLight, Mesh, ShadowGenerator } from '@babylonjs/core';
import Game from '../../game/Game';

class Shadows {
    private _scene = Game.instance.scene;

    // Source light
    private _sourceLight: DirectionalLight;

    // Config
    private _shadowGenerator: ShadowGenerator;
    private _mapSize: number = 8192;
    private _usePercentageCloserFiltering: boolean = true;
    private _filteringQuality: number = 4;

    /////////////////
    // Constructor //
    /////////////////

    constructor(sourceLight: DirectionalLight) {
        this._sourceLight = sourceLight;
        this._shadowGenerator = this._configureShadowGenerator();
        this._initializeShadowManager();
    }

    private _configureShadowGenerator(): ShadowGenerator {
        const shadowGenerator = new ShadowGenerator(this._mapSize, this._sourceLight);

        // anti-aliasing
        shadowGenerator.usePercentageCloserFiltering = this._usePercentageCloserFiltering;
        shadowGenerator.filteringQuality = this._filteringQuality;

        return shadowGenerator;
    }

    private _initializeShadowManager(): void {
        // Initialize shadow generator
        this._shadowGenerator = this._configureShadowGenerator();

        // Add all existing meshes to the shadow generator
        this._scene.meshes.forEach((mesh: Mesh) => {
            this._addShadowCasterRecursively(mesh);
        });

        // Create observer to add new meshes to the shadow generator
        this._scene.onNewMeshAddedObservable.add((mesh: Mesh) => {
            this._addShadowCasterRecursively(mesh);
        });

        // Create observer to remove meshes from the shadow generator
        this._scene.onMeshRemovedObservable.add((mesh: Mesh) => {
            this._shadowGenerator.removeShadowCaster(mesh);
        });
    }

    private _addShadowCasterRecursively(mesh: Mesh): void {
        // Add mesh to shadow generator
        this._shadowGenerator.addShadowCaster(mesh, true);

        // Enable shadow casting on mesh
        mesh.receiveShadows = true;

        // Recursively add shadow casters
        if (mesh.getChildMeshes) {
            mesh.getChildMeshes().forEach((child: Mesh) => {
                this._addShadowCasterRecursively(child);
            });
        }
    }

    ////////////////
    // Public API //
    ////////////////

    public dispose(): void {
        this._shadowGenerator.dispose();
    }
}

export default Shadows;
