// import { Context } from '../context';
// import { PluginAction, Plugin } from '../plugin';

// export class KeyBasedLocalStoragePlugin<State> implements Plugin<State> {
//   constructor(private _namespace: string) {}

//   visit(
//     context: Context<Record<string, any>>,
//     action: PluginAction<Record<string, any>>,
//   ): void {
//     // Initialization
//     if (action.id === 'init') {
//       const state = Object.keys(context.state).reduce((currentState, key) => {
//         return {
//           ...currentState,
//           [key]: localStorage.getItem(this._resolveKey(key)),
//         };
//       }, context.state);
//       context.state = { ...context.state, ...state };
//     }

//     // After state change
//     if (action.id === 'after-change-state') {
//       Object.entries(context.state).forEach(([key, value]) => {
//         localStorage.setItem(this._resolveKey(key), JSON.stringify(value));
//       });
//     }
//   }

//   private _resolveKey(key: string): string {
//     return `@${this._namespace}/${key}`;
//   }
// }

// export class ObjectBasedLocalStoragePlugin<State> implements Plugin<State> {
//   constructor(private _namespace: string) {}

//   visit(context: Context<State>, action: PluginAction<State>): void {
//     // Initialization
//     if (action.id === 'init') {
//       const state = localStorage.getItem(this._resolveKey());
//       if (state) {
//         context.state = JSON.parse(state) as State;
//       }
//     }

//     // After state change
//     if (action.id === 'after-change-state') {
//       localStorage.setItem(this._resolveKey(), JSON.stringify(context.state));
//     }
//   }

//   private _resolveKey(): string {
//     return `@${this._namespace}`;
//   }
// }
