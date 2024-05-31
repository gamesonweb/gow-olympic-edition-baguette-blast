
/**
 * Interface for application states in a Babylon.js environment.
 * Defines the basic structure for initializing, disposing of, and animating states.
 */
interface StateInterface {
    /**
     * Initializes the state with the given scene.
     * @returns {Promise<void>} A promise that resolves when initialization is complete.
     */
    init(): Promise<void>;

    /**
     * Disposes of resources or subscriptions the state has created.
     */
    dispose(): void;

    /**
     * Called on each frame to update and animate the state.
     * @param {number} deltaTime - The time in seconds since the last frame.
     */
    update(deltaTime: number): void;
}

export default StateInterface;
