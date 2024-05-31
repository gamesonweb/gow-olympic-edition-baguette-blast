import State from './EnumState';
import BienvenueState from './states/BienvenueState';
import CreditState from './states/CreditState';
import DialogueState from './states/DialoguesState';
import HomeState from './states/HomeState';
import LevelSelectState from './states/LevelSelect';
import LevelState from './states/LevelState';
import LooseState from './states/LooseState';
import NoVrState from './states/NoVrState';
import SettingsState from './states/SettingsState';
import StateInterface from './states/StateInterface';
import WinState from './states/WinState';

/**
 * Manages the different states of the application, such as menu, game levels, etc.
 */
class StateManager {
    private _states: Map<State, StateInterface>;
    private _currentState: StateInterface | null = null;

    /**
     * Initializes the state manager with the given scene and initial state.
     * @param {Scene} scene - The Babylon.js scene for the level.
     * @param {State} initialState - The initial state of the application.
     */
    public constructor() {
        this._states = new Map<State, StateInterface>([
            [State.Home, new HomeState()],
            [State.SelectLevel, new LevelSelectState()],
            [State.Settings, new SettingsState()],
            [State.Credit, new CreditState()],
            [State.Dialogue1, new DialogueState('1')],
            [State.Dialogue2, new DialogueState('2')],
            [State.Dialogue3, new DialogueState('3')],
            [State.Dialogue4, new DialogueState('4')],
            [State.Dialogue5, new DialogueState('5')],
            [State.Dialogue6, new DialogueState('6')],
            [State.Dialogue7, new DialogueState('7')],
            [State.Level1, new LevelState(1)],
            [State.Level2, new LevelState(2)],
            [State.Level3, new LevelState(3)],
            [State.Level4, new LevelState(4)],
            [State.Level5, new LevelState(5)],
            [State.Level6, new LevelState(6)],
            [State.Win, new WinState()],
            [State.Loose, new LooseState()],
            [State.NoVr, new NoVrState()],
            [State.Bienvenue, new BienvenueState()],
        ]);
    }

    /**
     * Gets the current active state.
     * @returns {StateInterface | null} The currently active state.
     */
    public get currentState(): StateInterface | null {
        return this._currentState;
    }

    /**
     * Changes the current state to the given state.
     * @param {State} State - The state to change to.
     */
    public changeState(State: State): void {
        if (this._currentState) {
            this._currentState.dispose();
        }

        this._currentState = this._states.get(State);
        this._currentState.init();
    }
}

export default StateManager;
