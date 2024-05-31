class CollisionManager {
    private _colliders: ICollider[];

    /////////////////
    // Constructor //
    /////////////////

    public constructor() {
        this._colliders = [];
    }

    ////////////////
    // public API //
    ////////////////

    /**
     * Add a collider to the list of colliders
     *
     * @param collider The collider to add
     */
    public addCollider(collider) {
        this._colliders.push(collider);
    }

    /**
     * Remove a collider from the list of colliders
     *
     * @param collider The collider to remove
     */
    public removeCollider(collider) {
        const index = this._colliders.indexOf(collider);
        if (index > -1) {
            this._colliders.splice(index, 1);
        }
    }

    /**
     * Check for collisions between all colliders
     */
    public update() {
        const collidersSnapshot = [...this._colliders]; // Creates a copy of the list of colliders
        for (let i = 0; i < collidersSnapshot.length; i++) {
            for (let j = 0; j < collidersSnapshot.length; j++) {
                if (i !== j && collidersSnapshot[i].collidesWith(collidersSnapshot[j])) {
                    collidersSnapshot[i].onCollision(collidersSnapshot[j]);
                    collidersSnapshot[j].onCollision(collidersSnapshot[i]);
                }
            }
        }
    }
}
export default CollisionManager;
