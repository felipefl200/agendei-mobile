# Arquitetura MVVM

Este projeto adota uma migração incremental para MVVM, mantendo as rotas do Expo Router em `src/app` e movendo gradualmente telas e estado de UI para `src/features`.

## Camadas

- Model: `src/domain`, `src/application/useCases` e `src/infra`.
- ViewModel: hooks de tela em `src/features/<feature>/view-models`.
- View: screens em `src/features/<feature>/screens`, com JSX e composição visual.

## Estrutura de Features

Cada feature deve seguir este formato:

```txt
src/features/<feature>/
├── screens/
└── view-models/
```

Features iniciais:

- `auth`
- `appointments`
- `booking`
- `search-doctor`

## Convenção de ViewModels

- Nome do arquivo: `use[NomeDaTela]ViewModel.ts`.
- Nome do hook: `use[NomeDaTela]ViewModel`.
- Tipo de retorno: interface `[NomeDaTela]ViewModel`.
- Todo ViewModel deve ter um comentário JSDoc no topo explicando sua responsabilidade.

Exemplo ViewModel (`useLoginViewModel.ts`):

```ts
/**
 * ViewModel da tela de Login.
 * Centraliza estado de formulário, ações da tela e integração com os use cases.
 */
interface LoginViewModel {
  email: string
  // ...
  handleLogin: () => Promise<void>
}

function useLoginViewModel(): LoginViewModel {
  // ...
}
```

Exemplo View (`LoginScreen.tsx`):

```tsx
import { useLoginViewModel } from '../view-models/useLoginViewModel'

export default function LoginScreen() {
  const vm = useLoginViewModel()

  return (
    <View>
      <TextInput value={vm.email} onChangeText={vm.setEmail} />
      <Button onPress={vm.handleLogin} title="Login" />
    </View>
  )
}
```

## Regras de Migração

- `src/app` deve continuar contendo apenas rotas e imports das screens.
- **Regra de Ouro da View**: Screens não devem chamar API, use cases ou React Query diretamente. Toda lógica de negócio reside no ViewModel.
- **Regra de Ouro do ViewModel**: ViewModel NÃO pode importar componentes do React Native (`View`, `Text`, `StyleSheet`, `Alert`, etc.). Ele é apenas estado e lógica UI-agnóstica.
- ViewModels podem compor hooks de dados e controlar estado específico da tela.
- Use cases não devem importar React, React Query, Zustand ou bibliotecas de UI.
- `src/hooks` foi descontinuado. Hooks globais residem em `features/shared/hooks/` ou dentro de `features/[feature]/hooks/`.
