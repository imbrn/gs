import { Context } from './context'
import { Observer } from './observer'
import { Plugin, PluginAction } from './plugin'

export class Orchestrator<State>
  implements Context<State, Plugin<State>, Observer<State>>
{
  static create<State extends object>(
    plugins: Plugin<State>[],
    initialState: State,
  ): Orchestrator<State> {
    return createOrchestratorProxy(new Orchestrator(plugins, initialState))
  }

  private _state: State
  private _plugins: Plugin<State>[]
  private _observers: Set<Observer<State>> = new Set()

  private constructor(plugins: Plugin<State>[], initialState: State) {
    this._state = initialState
    this._plugins = plugins
    this._visit({ id: 'init' })
  }

  get state(): State {
    return this._state
  }

  set state(state: State) {
    const oldState = this.state
    this._visit({ id: 'before-state-change', newState: state })
    this._state = state
    this._visit({ id: 'after-state-change', oldState })

    if (this.state !== oldState) {
      this._notifyStateChange(oldState)
    }
  }

  private _notifyStateChange(oldState: State): void {
    this._visit({ id: 'before-notify-state-change', oldState })
    this._observers.forEach((observer) => {
      observer.onStateChange(this.state, oldState)
    })
    this._visit({ id: 'after-notify-state-change', oldState })
  }

  get plugins(): Plugin<State>[] {
    return this._plugins
  }

  get observers(): Set<Observer<State>> {
    return this._observers
  }

  private _visit(action: PluginAction<State>): void {
    this._plugins.forEach((plugin) => {
      plugin.visit(this, action)
    })
  }
}

function createOrchestratorProxy<State extends object>(
  orchestrator: Orchestrator<State>,
): Orchestrator<State> {
  return new Proxy(orchestrator, {
    get<K extends 'state' | 'plugins'>(target: Orchestrator<State>, prop: K) {
      if (prop === 'state') {
        if (typeof target.state === 'object') {
          return createOrchestratorStateProxy(target)
        }
        return target.state
      }

      if (prop in target) {
        return target[prop]
      }

      throw new Error(`Property not found: ${prop}`)
    },
  })
}

function createOrchestratorStateProxy<State extends object>(
  orchestrator: Orchestrator<State>,
): State {
  return new Proxy(orchestrator.state, {
    set(target, prop, value): boolean {
      if (prop in target) {
        orchestrator.state = { ...orchestrator.state, [prop]: value }
        return true
      }

      return false
    },
  })
}
