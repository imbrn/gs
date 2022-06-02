import { Context } from './context';

export interface Plugin<State> {
  visit(context: Context<State>, action: PluginAction<State>): void;
}

export type PluginAction<State> =
  | { id: 'init' }
  | { id: 'before-state-change'; newState: State }
  | { id: 'after-state-change'; oldState: State }
  | { id: 'before-notify-state-change'; oldState: State }
  | { id: 'after-notify-state-change'; oldState: State };
