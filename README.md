# News App React Native

Aplicativo moderno de notícias desenvolvido com React Native/Expo, implementando arquitetura limpa e padrões avançados de desenvolvimento.

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Expo CLI: `npm install -g @expo/cli`

### Passos para Rodar

```bash
# 1. Clonar e instalar dependências
git clone <repository-url>
cd news-app
npm install

# 2. Iniciar o projeto
npm start

# 3. Escolher plataforma
# - Pressione 'a' para Android
# - Pressione 'i' para iOS  
# - Pressione 'w' para Web
```

### Scripts Disponíveis

```bash
npm start          # Inicia o Expo Dev Server
npm run android    # Roda no Android
npm run ios        # Roda no iOS
npm run web        # Roda no navegador
npm run lint       # Verifica ESLint
npm run format     # Formata código com Prettier
```

## 📚 Tecnologias e Bibliotecas

### Core Technologies
- **React Native** - Framework mobile multiplataforma
- **Expo** - Plataforma para desenvolvimento React Native
- **TypeScript** - Tipagem estática JavaScript
- **React Navigation** - Navegação entre telas

### Gerenciamento de Estado e Dados
- **@tanstack/react-query** - Cache e sincronização de dados
- **@uidotdev/usehooks** - Hooks utilitários (debounce)

### HTTP e Networking
- **Axios** - Cliente HTTP customizado
- **News API** - Fonte de dados de notícias

### Desenvolvimento e Qualidade
- **ESLint** - Análise estática de código
- **Prettier** - Formatação automática
- **@sentry/react-native** - Monitoramento de erros

### UI/UX
- **@expo/vector-icons** - Ícones vetoriais
- **react-native-paper** - Componentes Material Design

## 🏗️ Arquitetura do Projeto

### Padrão Arquitetural
- **MVVM (Model-View-ViewModel)** com Clean Architecture
- **Dependency Injection** nos services
- **Hook-level Decoupling** para componentes reutilizáveis
- **Service Layer** separando lógica de negócio da apresentação

### Estrutura de Pastas
```
src/
├── core/                    # Módulos de domínio
│   ├── feed/               # Domínio do feed de notícias
│   ├── search/             # Domínio de busca
│   ├── news-detail/        # Domínio de detalhes
│   └── shared/             # Recursos compartilhados
│       ├── http/           # Cliente HTTP abstrato
│       └── services/       # Container de dependências
├── components/             # Componentes UI reutilizáveis
├── hooks/                  # Custom hooks específicos
├── utils/                  # Utilitários e configurações
└── contracts/              # Interfaces e tipos globais
```

### NewsCard - Padrão de Desacoplamento por Contexto

**Problema Resolvido**: Um componente visual com comportamentos diferentes por contexto.

**Solução**: Hook-level decoupling
- 🎯 **1 Componente Visual**: `NewsCard.tsx`
- 🎯 **1 Interface**: `NewsCardProps.ts`  
- 🎯 **N Hooks por Contexto**: `useFeedNewsCard`, `useSearchNewsCard`

**Benefícios**:
- Zero duplicação de código visual
- Fácil extensão para novos contextos
- Formatação específica (data relativa vs padrão)
- Analytics diferenciado por contexto

## 🚧 Melhorias Futuras
- [ ] **Testing** - Implementar testes unitários, integração e E2E
- [ ] **Performance Optimization** - Code splitting, otimização de imagens e bundle
- [ ] **Design System** - Componentes reutilizáveis e estilização
- [ ] **Desacoplamento de Recursos** - Módulos de domínio separados
