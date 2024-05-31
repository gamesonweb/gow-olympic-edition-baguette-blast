interface WeaponData {
    type: WeaponType;
    projectile: ProjectileType;
    force: number;
    durability: number;
    cooldown: number;
}

enum WeaponType {
    Hand = 'hand',
    Gun = 'gun',
    GatlingGun = 'gatlingGun',
    BoomerangLauncher = 'boomerangLauncher',
    JavelinLauncher = 'javelinLauncher',
    DiscLauncher = 'discLauncher',
    ChaosGun = 'chaosGun',
    None = 'none',
}

enum ProjectileType {
    Ball = 'ball',
    Laser = 'laser',
    Egg = 'Egg',
    Boomerang = 'boomerang',
    Javelin = 'javelin',
    Disc = 'disc',
    ChaosBall = 'chaosBall',
    None = 'none',
}

interface PlayerData {
    left_hand: WeaponData;
    right_hand: WeaponData;
    health: number;
    position: {
        x: number;
        y: number;
        z: number;
    };
}

interface BonusData {
    type: BonusType;
}

interface TimeBonusData extends BonusData {
    type: BonusType.Time;
    duration: number;
    speedRatio: number; // 1 is normal speed, 0.5 is half speed.
    // Don't hesitate to play with this value to create interesting gameplay
}

interface ScoreBonusData extends BonusData {
    type: BonusType.Score;
    score: number;
}

enum BonusType {
    Score = 'score',
    Time = 'time',
}

enum BehaviourType {
    AttractEnemy = 'attractEnemy',
    AvoidMesh = 'avoidMesh',
    Floating = 'floating',
    Gravity = 'gravity',
    MoveAtoB = 'moveAtoB',
    MoveFreelyInCube = 'moveFreelyInCube',
    Rush = 'rush',
}

interface BehaviourData {
    type: BehaviourType;
}

interface AttractEnemyProperties extends BehaviourData {
    type: BehaviourType.AttractEnemy;
    force: number;
    radius: number;
}

interface AvoidMeshMeshProperties extends BehaviourData {
    type: BehaviourType.AvoidMesh;
    force: number;
    radius: number;
}

interface FloatingProperties extends BehaviourData {
    type: BehaviourType.Floating;
    force: number;
    oscillationFreq: number;
}

interface GravityProperties extends BehaviourData {
    type: BehaviourType.Gravity;
    force: number;
}

interface MoveAtoBProperties extends BehaviourData {
    type: BehaviourType.MoveAtoB;
    force: number;
    radius: number;
    pointA: {
        x: number;
        y: number;
        z: number;
    };
    pointB: {
        x: number;
        y: number;
        z: number;
    };
}

interface RushProperties extends BehaviourData {
    type: BehaviourType.Rush;
    force: number;
}

interface MoveFreelyInCubeProperties {
    type: BehaviourType.MoveFreelyInCube;
    force: number;
    radius: number;
    minPosition: { x: number; y: number; z: number };
    maxPosition: { x: number; y: number; z: number };
}

interface EnemyData {
    type: EnemyType;
    health: number;
    position: {
        x: number;
        y: number;
        z: number;
    };
    bonus: BonusData;
    behaviours: BehaviourData[];
    score: number;
}

enum EnemyType {
    Copper = 'copper',
    Silver = 'silver',
    Gold = 'gold',
    Pigeon = 'pigeon',
    PigeonBoss = 'pigeonBoss',
    PigeonShooter = 'pigeonShooter',
    PigeonDropper = 'pigeonDropper',
}

interface Wave {
    waveNumber: number; // Optionally added for clearer wave tracking
    enemies: EnemyData[];
}

interface EnvironmentData {
    time: number; // between 0 and 1, 0 for noon, 0.5 for midnight
    duration: number; // in seconds, time for one cycle
}

interface LevelData {
    player: PlayerData;
    emvironement: EnvironmentData;
    ui: uiData;
    waves: Wave[];
}

interface uiData {
    returnButtonOffset: {
        x: number;
        y: number;
        z: number;
    };
}

export {
    AttractEnemyProperties,
    AvoidMeshMeshProperties,
    BehaviourData,
    BehaviourType,
    BonusData,
    BonusType,
    EnemyData,
    EnemyType,
    FloatingProperties,
    GravityProperties,
    LevelData,
    MoveAtoBProperties,
    MoveFreelyInCubeProperties,
    ProjectileType,
    RushProperties,
    ScoreBonusData,
    TimeBonusData,
    WeaponData,
    WeaponType,
};
