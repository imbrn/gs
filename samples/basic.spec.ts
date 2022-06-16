import { Orchestrator } from '../packages/core/dist/orchestrator.js';

const orchestrator = Orchestrator.create([], {
  theme: 'dark',
  language: 'pt-BR',
  user: null,
});

orchestrator.observers.add({
  onStateChange: (state: any) =>
    console.log(`state changed: ${JSON.stringify(state, null, 2)}`),
});

console.log(orchestrator.state);

orchestrator.state.theme = 'light';
console.log(orchestrator.state.theme);

orchestrator.state.user = { token: '123456' };
console.log(orchestrator.state.user);

orchestrator.state.language = 'en-US';
console.log(orchestrator.state.language);

console.log(orchestrator.state);
