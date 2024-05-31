interface ICollider {
    collidesWith(other: ICollider): boolean;
    onCollision(other: ICollider): void;
}
