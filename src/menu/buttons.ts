import { ActionManager, ExecuteCodeAction, Mesh, Scene } from '@babylonjs/core';

/**
 * InteractionManager is responsible for setting up interactions in a Babylon.js scene.
 * It provides utility methods to assign interactive behaviors to various scene elements.
 */
class Buttons {
    /**
     * Sets up an interaction for a mesh in the scene.
     *
     * @param {Scene} scene - The Babylon.js scene to which the mesh belongs.
     * @param {Mesh} mesh - The mesh to which the interaction will be attached.
     * @param {() => void} onPickAction - A callback function that is executed when the mesh is picked (clicked).
     */
    static clickable(scene: Scene, mesh: Mesh, onPickAction: () => void): void {
        mesh.actionManager = new ActionManager(scene);
        mesh.actionManager.registerAction(
            new ExecuteCodeAction(ActionManager.OnPickTrigger, () => {
                onPickAction();
            })
        );
    }
}

export default Buttons;
