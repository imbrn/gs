import { Context } from './context';
import { Observer } from './observer';
import { Plugin, PluginAction } from './plugin';

export class Orchestrator<State> implements Context<State> {
  private _state: State;
  private _plugins: Plugin<State>[];
  private _observers: Set<Observer<State>> = new Set();

  static create<State>(
    plugins: Plugin<State>[],
    initialState: State,
  ): Orchestrator<State> {
    return createOrchestratorProxy(new Orchestrator(plugins, initialState));
  }

  private constructor(plugins: Plugin<State>[], initialState: State) {
    this._state = initialState;
    this._plugins = plugins;
    this._visit({ id: 'init' });
  }

  get state(): State {
    return this._state;
  }

  set state(state: State) {
    const oldState = this.state;
    this._visit({ id: 'before-change-state', newState: state });
    this._state = state;
    this._visit({ id: 'after-change-state', oldState: oldState });

    if (this.state !== oldState) {
      this._notifyStateChange(oldState);
    }
  }

  private _notifyStateChange(oldState: State): void {
    this._visit({ id: 'before-notify-state-change', oldState });
    this._observers.forEach((observer) => {
      observer.onStateChange(this.state, oldState);
    });
    this._visit({ id: 'after-notify-state-change', oldState });
  }

  get plugins(): Plugin<State>[] {
    return this._plugins;
  }

  get observers(): Set<Observer<State>> {
    return this._observers;
  }

  private _visit(action: PluginAction<State>): void {
    this._plugins.forEach((plugin) => {
      plugin.visit(this, action);
    });
  }
}

function createOrchestratorProxy<State>(
  orchestrator: Orchestrator<State>,
): Orchestrator<State> {
  return new Proxy(orchestrator, {
    get: function <K extends 'state' | 'plugins'>(
      target: Orchestrator<State>,
      prop: K,
    ) {
      if (prop === 'state') {
        if (typeof target.state === 'object') {
          return createOrchestratorStateProxy(target);
        }
        return target.state;
      }

      if (prop in target) {
        return target[prop];
      }

      throw new Error(`Property not found: ${prop}`);
    },
  });
}

function createOrchestratorStateProxy<State extends Object>(
  orchestrator: Orchestrator<State>,
): State {
  return new Proxy(orchestrator.state, {
    set: function (target, prop, value): boolean {
      if (prop in target) {
        orchestrator.state = { ...orchestrator.state, [prop]: value };
        return true;
      }

      return false;
    },
  });
}
