export interface Observer<State> {
  onStateChange(newState: State, oldState: State): void;
}
