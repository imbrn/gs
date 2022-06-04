export interface Plugin<T> {
  visit<Context>(context: Context, action: PluginAction<T>): void
}

export type PluginAction<T> =
  | { id: 'init' }
  | { id: 'before-state-change'; newState: T }
  | { id: 'after-state-change'; oldState: T }
  | { id: 'before-notify-state-change'; oldState: T }
  | { id: 'after-notify-state-change'; oldState: T }
