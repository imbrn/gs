import { Context } from './context';

export interface Plugin<State> {
  visit(context: Context<State>, action: PluginAction<State>): void;
}

export type PluginAction<State> =
  | { id: 'init' }
  | { id: 'before-change-state'; newState: State }
  | { id: 'change-state'; newState: State }
  | { id: 'after-change-state'; oldState: State }
  | { id: 'after-change-state'; oldState: State }
  | { id: 'before-notify-state-change'; oldState: State }
  | { id: 'after-notify-state-change'; oldState: State };
