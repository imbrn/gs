import { Orchestrator } from '../packages/core/dist/orchestrator.js';

globalThis.stuff = Orchestrator.create([], {
  theme: 'dark',
  language: 'pt-BR',
  user: null,
});

globalThis.stuff.observers.add({
  onStateChange: () => console.log('state changed'),
});

globalThis.stuff.state.theme = 'light';

console.log(globalThis.stuff.state);
console.log(globalThis.stuff.state.theme);
console.log(globalThis.stuff.state.user);
