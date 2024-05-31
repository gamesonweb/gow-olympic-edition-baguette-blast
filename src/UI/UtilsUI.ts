import { Color3, Mesh, MeshBuilder, Scene, StandardMaterial, Vector3 } from '@babylonjs/core';
import {
    AdvancedDynamicTexture,
    Control,
    HolographicButton,
    Image,
    MeshButton3D,
    Rectangle,
    StackPanel3D,
    TextBlock,
} from '@babylonjs/gui';

/**
 * Utils for UI
 */
class UtilsUI {
    public static colorSaumon = new Color3(1, 0.512, 0.456);

    /**
     * Create a button
     * @param text the text of the button
     * @param panel the panel where the button will be added
     * @param scale the scale of the button
     * @param fontSize the font size of the button
     * @param callback the callback when the button is clicked
     * @param hoverCallback the callback when the button is hovered
     * @param albedoColor albedo color of the button
     * @param innerGlowColorIntensity intensity of the inner glow
     */
    public static createActionButton(
        text: string,
        panel: StackPanel3D,
        scale: Vector3,
        fontSize: number,
        callback: () => void,
        hoverCallback?: { in: () => void; out: () => void },
        albedoColor?: Color3,
        innerGlowColorIntensity?: number
    ): HolographicButton {
        // Create a button
        const button = new HolographicButton(text);
        button.onPointerClickObservable.add(callback);

        if (hoverCallback) {
            button.onPointerEnterObservable.add(hoverCallback.in);
            button.onPointerOutObservable.add(hoverCallback.out);
        }

        panel.addControl(button);
        button.scaling = scale;

        button.backMaterial.innerGlowColorIntensity = innerGlowColorIntensity || 0.5;
        button.backMaterial.albedoColor = albedoColor || UtilsUI.colorSaumon;

        // Create a text for the button
        const buttonText = new TextBlock();
        buttonText.text = text;
        buttonText.fontWeight = 'bold';
        buttonText.color = 'white';
        buttonText.fontSize = fontSize;
        buttonText.scaleX = 1 / scale.x;
        buttonText.scaleY = 1 / scale.y;
        button.content = buttonText;

        return button;
    }

    /**
     * Create a text zone
     * @param text the text of the text zone
     * @param panel the panel where the text zone will be added
     * @param width the width of the text zone
     * @param height the height of the text zone
     * @param fontSize the font size of the text zone
     * @param scene the scene
     * @returns
     */
    public static createTextZone(
        text: string,
        panel: StackPanel3D,
        width: number,
        height: number,
        fontSize: number,
        scene: Scene
    ): MeshButton3D {
        // Create a plane mesh
        const planeMesh = MeshBuilder.CreatePlane(
            'textZonePlane',
            {
                width: width,
                height: height,
                sideOrientation: Mesh.DOUBLESIDE,
            },
            scene
        );

        // Create an advanced dynamic texture for the plane mesh
        const advancedTexture = AdvancedDynamicTexture.CreateForMesh(
            planeMesh,
            Math.round(width * 512),
            Math.round(height * 512)
        );

        // Create a 2D rectangle container for the text block
        const textZone = new Rectangle('textZone');
        textZone.thickness = 3;
        textZone.background = 'rgba(0, 0, 0, 0.5)';
        textZone.cornerRadius = 10;
        advancedTexture.addControl(textZone);

        // Create a text block inside the rectangle
        const textBlock = new TextBlock();
        textBlock.text = text;
        textBlock.color = 'white';
        textBlock.fontSize = fontSize;
        textBlock.fontWeight = 'bold';
        textBlock.textWrapping = true; // Enable text wrapping
        textBlock.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
        textBlock.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
        textZone.addControl(textBlock);

        // Create a standard material and set the advanced dynamic texture as its diffuse texture
        const material = new StandardMaterial('textZoneMaterial', scene);
        material.diffuseTexture = advancedTexture;
        material.opacityTexture = material.diffuseTexture;
        material.emissiveColor = Color3.White();
        material.disableLighting = true;
        planeMesh.material = material;

        // Create a MeshButton3D using the plane mesh
        const meshButton = new MeshButton3D(planeMesh);
        meshButton.scaling.x = width;
        meshButton.scaling.y = height;

        // Disable scaling effect on pointer enter and exit
        meshButton.pointerEnterAnimation = () => {};
        meshButton.pointerOutAnimation = () => {};
        meshButton.pointerUpAnimation = () => {};
        meshButton.pointerDownAnimation = () => {};

        // Add the mesh button to the 3D stack panel
        panel.addControl(meshButton);

        return meshButton;
    }

    /**
     * Create an image zone
     * @param imagePath the path of the image
     * @param panel the panel where the image zone will be added
     * @param width the maximum width of the image zone
     * @param height the maximum height of the image zone
     * @param scene the scene
     * @returns
     */
    public static createImageZone(
        imagePath: string,
        panel: StackPanel3D,
        width: number,
        height: number,
        scene: Scene
    ): MeshButton3D {
        // Create a plane mesh
        const planeMesh = MeshBuilder.CreatePlane(
            'imageZonePlane',
            {
                width: width,
                height: height,
                sideOrientation: Mesh.DOUBLESIDE,
            },
            scene
        );

        // Create an advanced dynamic texture for the plane mesh
        const advancedTexture = AdvancedDynamicTexture.CreateForMesh(
            planeMesh,
            Math.round(width * 512),
            Math.round(height * 512)
        );

        // Create a 2D rectangle container for the image
        const imageZone = new Rectangle('imageZone');
        imageZone.thickness = 0; // No border
        imageZone.background = 'rgba(0, 0, 0, 0.5)';
        imageZone.cornerRadius = 10;
        advancedTexture.addControl(imageZone);

        // Create an image inside the rectangle
        const image = new Image('image', imagePath);
        image.stretch = Image.STRETCH_UNIFORM;
        imageZone.addControl(image);

        // Create a standard material and set the advanced dynamic texture as its diffuse texture
        const material = new StandardMaterial('imageZoneMaterial', scene);
        material.diffuseTexture = advancedTexture;
        material.opacityTexture = material.diffuseTexture;
        material.emissiveColor = Color3.White();
        material.disableLighting = true;
        planeMesh.material = material;

        // Create a MeshButton3D using the plane mesh
        const meshButton = new MeshButton3D(planeMesh);
        meshButton.scaling.x = width;
        meshButton.scaling.y = height;

        // Disable scaling effect on pointer enter and exit
        meshButton.pointerEnterAnimation = () => {};
        meshButton.pointerOutAnimation = () => {};
        meshButton.pointerUpAnimation = () => {};
        meshButton.pointerDownAnimation = () => {};

        // Add the mesh button to the 3D stack panel
        panel.addControl(meshButton);

        return meshButton;
    }
}

export default UtilsUI;
