import { Observer } from './observer';
import { Plugin } from './plugin';

export interface Context<State> {
  state: State;
  readonly plugins: Plugin<State>[];
  readonly observers: Set<Observer<State>>;
}
