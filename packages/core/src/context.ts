export interface Context<State, Plugin, Observer> {
  state: State
  readonly plugins: Plugin[]
  readonly observers: Set<Observer>
}
