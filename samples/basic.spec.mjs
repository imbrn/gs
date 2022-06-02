import { Orchestrator } from '../packages/core/dist/orchestrator.js';

globalThis.stuff = Orchestrator.create([], {
  theme: 'dark',
  language: 'pt-BR',
  user: null,
});

globalThis.stuff.observers.add({
  onStateChange: (state) =>
    console.log(`state changed: ${JSON.stringify(state, null, 2)}`),
});

console.log(globalThis.stuff.state);

globalThis.stuff.state.theme = 'light';
console.log(globalThis.stuff.state.theme);

globalThis.stuff.state.user = { token: '123456' };
console.log(globalThis.stuff.state.user);

globalThis.stuff.state.language = 'en-US';
console.log(globalThis.stuff.state.language);

console.log(globalThis.stuff.state);
