import {
    Color3,
    DynamicTexture,
    Engine,
    Mesh,
    MeshBuilder,
    StandardMaterial,
    Texture,
    TransformNode,
    Vector3,
} from '@babylonjs/core';
import { AdvancedDynamicTexture, GUI3DManager, HolographicButton, PlanePanel } from '@babylonjs/gui';
import Game from '../game/Game';
import State from '../stateManager/EnumState';

class CustomUI {
    public static buttons: HolographicButton[] = [];
    public static textZones: DynamicTexture[] = [];
    public static planes: Mesh[] = [];
    public static panelCenter: Vector3 = new Vector3(-0.5, 3.6, 11.5);
    public static panelTextTopRight: Vector3 = new Vector3(1.5, 4.8, 11.5);
    public static panelTextCenter: Vector3 = new Vector3(this.panelCenter._x, 4.2, 11.5);

    public static addButton(
        name: string,
        state: State,
        panel: PlanePanel,
        panelimg,
        isAlone: boolean = false,
        isRight: boolean = false
    ): HolographicButton {
        const button = new HolographicButton(name);
        panel.addControl(button);
        this.buttons.push(button);
        button.text = name;
        button.plateMaterial.alphaMode = Engine.ALPHA_ONEONE;
        button.plateMaterial.diffuseColor = new Color3(0.86, 0.69, 0.38);

        // Adjust button size
        if (button.mesh) {
            button.mesh.scaling.x = 0.7; // Smaller button width
            button.mesh.scaling.y = 0.4; // Smaller button height
        }

        // If alone, move the button to the bottom left
        if (isAlone) {
            button.position = new Vector3(0.5, 0.5, 0);
        } else if (isRight) {
            panel.position._x = 2;
        }

        // Dispose all the buttons and change state when clicked
        button.onPointerClickObservable.add(() => {
            // Dispose of the buttons
            for (const btn of this.buttons) {
                btn.dispose();
            }
            for (const textZone of this.textZones) {
                textZone.dispose();
            }
            for (const plane of this.planes) {
                plane.dispose();
            }
            Game.instance.stateManager.changeState(state);
        });

        return button;
    }

    public static createImageZone(position: Vector3, width: number, height: number, imageUrl: string): void {
        const plane = MeshBuilder.CreatePlane('imagePlane', { width, height }, Game.instance.scene);
        plane.position = position;
        const material = new StandardMaterial('imageMat', Game.instance.scene);
        const imageTexture = new Texture(imageUrl, Game.instance.scene, true, false);
        material.diffuseTexture = imageTexture;
        plane.material = material;
        this.planes.push(plane);
    }

    public static addPanel(rows: number = 1, columns: number = 3): PlanePanel {
        const manager = new GUI3DManager(Game.instance.scene);
        const panel = new PlanePanel();
        panel.margin = 0.2;
        panel.rows = rows;
        panel.columns = columns;

        const anchor = new TransformNode('');
        manager.addControl(panel);
        panel.linkToTransformNode(anchor);
        panel.position.set(this.panelCenter.x, this.panelCenter.y, this.panelCenter.z);
        panel.blockLayout = true;
        // panel.blockLayout = false;

        if (rows === 1 && columns === 1) {
            panel.position.set(this.panelCenter.x, this.panelCenter.y - 1, this.panelCenter.z);
        }
        return panel;
    }

    // Take a string and return a list of strings that fit in the width
    public static async changePanel(state: string): Promise<AdvancedDynamicTexture> {
        const states = {
            home: 'assets/frames/panels/Home.json',
            lvlselect: 'assets/frames/panels/Blank.json',
            settings: 'assets/frames/panels/Settings.json',
            credit: 'assets/frames/panels/Credit.json',
            '1': 'assets/frames/panels/StartLvl1.json',
            '2': 'assets/frames/panels/StartLvl2.json',
            '3': 'assets/frames/panels/StartLvl3.json',
            '4': 'assets/frames/panels/StartLvl4.json',
            '5': 'assets/frames/panels/StartLvl5.json',
            '6': 'assets/frames/panels/StartLvl6.json',
            EndLvl6: 'assets/frames/panels/EndLvl6.json',
            loose: 'assets/frames/panels/Loose.json',
            win: 'assets/frames/panels/Win.json',
            bienvenue: 'assets/frames/panels/Bienvenue.json',
        };

        const scene = Game.instance.scene;
        const box = MeshBuilder.CreateBox('box', { height: 9, width: 16, depth: 0.1 }, scene);
        box.scaling = new Vector3(0.4, 0.4, 0.4);
        box.position = new Vector3(-0.5, 3.6, 11.5);

        const url = states[state];
        const uiTexture = AdvancedDynamicTexture.CreateForMesh(box, 2048, 1024, false);

        try {
            await uiTexture.parseFromURLAsync(url);
            const material = new StandardMaterial('mat', Game.instance.scene);
            material.diffuseTexture = uiTexture;
        } catch (error) {
            console.error('Error loading UI texture:', error);
        }
        return uiTexture;
    }
}
export default CustomUI;
