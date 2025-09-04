# News App React Native

Um aplicativo de notícias desenvolvido com React Native e Expo que integra com a News API.

## Funcionalidades

- 📰 **Top Notícias**: Visualize as principais notícias do momento
- 🔍 **Busca com Filtros**: Pesquise notícias com filtros avançados
- 📱 **Navegação por Abas**: Interface intuitiva com duas abas principais
- 🔄 **Pull to Refresh**: Atualize as notícias puxando para baixo
- ♾️ **Infinity Scroll**: Carregamento infinito de notícias relacionadas na tela de detalhes
- 🎨 **UI Moderna**: Interface elegante com design customizado
- 📄 **Tela de Detalhes**: Visualização completa da notícia com conteúdo expandido
- 🔗 **Ações Rápidas**: Compartilhar e abrir notícia original

## Arquitetura

O projeto segue o padrão **MVVM (Model-View-ViewModel)**:

```
src/
├── components/     # Componentes reutilizáveis (View)
├── screens/        # Telas da aplicação (View)
├── viewmodels/     # Lógica de negócio com React Query (ViewModel)
├── hooks/          # Custom hooks (useInfiniteTopNews)
├── services/       # Serviços de API (NewsApiService)
├── navigation/     # Configuração de navegação
├── types/          # Definições TypeScript
└── utils/          # Utilitários e configurações
```

## Tecnologias Utilizadas

- **React Native** com **Expo**
- **TypeScript** para tipagem estática
- **React Navigation** para navegação
- **React Query (@tanstack/react-query)** para gerenciamento de estado e cache
- **Axios** para requisições HTTP
- **ESLint** + **Prettier** para padronização de código
- **News API** para dados de notícias

## Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar News API

⚠️ **Para Revisores**: A API key já está configurada no arquivo `.env` para facilitar a avaliação.

Para configuração própria:

1. Acesse [NewsAPI.org](https://newsapi.org/) e crie uma conta gratuita
2. Obtenha sua chave de API
3. Crie um arquivo `.env` na raiz do projeto:

```bash
cp .env.example .env
```

4. Edite o arquivo `.env` e adicione sua API key:

```
NEWS_API_KEY=fed7bcc4b2684b5883de9567ec63d22f
```

### 3. Executar o aplicativo

```bash
# Iniciar servidor de desenvolvimento
npm start

# Para Android
npm run android

# Para iOS (apenas no macOS)
npm run ios

# Para Web
npm run web
```

### 4. Scripts de Desenvolvimento

```bash
# Verificar e corrigir código
npm run code:fix          # Executa ESLint + Prettier
npm run lint              # Verificar problemas ESLint
npm run lint:fix          # Corrigir problemas ESLint
npm run format            # Formatar código com Prettier
npm run format:check      # Verificar formatação
```

## Estrutura das Telas

### Top Notícias

- Lista das principais notícias do momento
- Pull to refresh para atualização
- Cards com imagem, título, descrição e fonte
- Tap no card para abrir tela de detalhes

### Busca

- Campo de busca com debounce (500ms)
- Filtros por ordenação:
  - Mais recentes (publishedAt)
  - Relevância (relevancy)
  - Popularidade (popularity)
- Resultados em tempo real
- Contador de resultados encontrados

### Detalhes da Notícia

- **Conteúdo completo** da notícia selecionada
- **Infinity scroll** com notícias relacionadas
- **Ações fixas** na parte inferior:
  - Compartilhar notícia
  - Abrir artigo original no navegador
- **Layout otimizado** sem sobreposição de conteúdo
- **Loading states** para carregamento suave

## Padrões de Código

O projeto utiliza **ESLint** e **Prettier** para manter qualidade e consistência:

### Configurações

- **ESLint**: Configurado para TypeScript + React Native
- **Prettier**: Formatação automática com padrões customizados
- **Arquivo de configuração**: `.prettierrc.js` e `eslint.config.js`

### Uso Recomendado

```bash
# Antes de commitar, sempre execute:
npm run code:fix
```

## Componentes Principais

### NewsCard - Arquitetura de Desacoplamento por Contexto

**CRÍTICO PARA ESCALA**: O NewsCard implementa desacoplamento no nível de hook, não de componente.

#### Estrutura:
- **1 Componente Visual**: `src/components/NewsCard.tsx`
- **1 Interface**: `src/components/NewsCardProps.ts`  
- **N Hooks por Contexto**: `src/hooks/use{Context}NewsCard.ts`

#### Hooks Específicos por Contexto:

**`useFeedNewsCard`** - Para listas do feed principal:
- Data: Formato padrão `DD/MM/YYYY`
- Analytics: `feed_main` context
- Compartilhamento: Contexto "feed principal"

**`useSearchNewsCard`** - Para resultados de busca:
- Data: Formato relativo `2h atrás`, `3d atrás`
- Analytics: `search_results` context  
- Compartilhamento: Contexto "resultados de busca"

#### Benefícios para Escala:
- ✅ **1 Visual, N Lógicas**: Mantém UI consistente com comportamentos específicos
- ✅ **Fácil Extensão**: Novos contextos = novo hook (ex: `useFavoritesNewsCard`)
- ✅ **Analytics Diferenciado**: Tracking específico por contexto
- ✅ **Formatações Específicas**: Data relativa vs padrão por contexto
- ✅ **Zero Duplicação**: Reutilização total do componente visual

#### Uso:
```tsx
// Feed
const feedProps = useFeedNewsCard(article);
return <NewsCard {...feedProps} />;

// Search  
const searchProps = useSearchNewsCard(article);
return <NewsCard {...searchProps} />;
```

#### Pontos de Melhoria - Analytics:

**IMPLEMENTAÇÃO ATUAL**: Sem analytics - focado na funcionalidade core.

**FUTURAS MELHORIAS PARA ANALYTICS**:
- 🎯 **Analytics Plugável**: Adicionar analytics via provider pattern
- 🎯 **Event Builder**: Factory para padronizar eventos por contexto  
- 🎯 **Multi-Provider**: Suporte simultâneo Firebase + Segment + Custom
- 🎯 **Type Safety**: Eventos tipados por contexto

**Implementação Ideal Futura**:
```tsx
// Hook genérico opcional
const analytics = useAnalytics(); // undefined se não configurado
analytics?.track('article_clicked', { context: 'feed_main' });

// Provider opcional
<AnalyticsProvider provider={segment}>
  <App />
</AnalyticsProvider>
```

Mantém o app funcional sem analytics, mas permite adição fácil quando necessário.

## Hooks Customizados (React Query)

### useTopNews

Hook para buscar top notícias:

- Cache de 5 minutos
- Retry automático em caso de erro
- Suporte a pull to refresh

### useSearchNews

Hook para busca de notícias:

- Ativado apenas quando há termo de busca
- Cache de 5 minutos
- Suporte a filtros avançados

### useInfiniteTopNews

Hook para infinity scroll:

- **Paginação automática** com `useInfiniteQuery`
- **Carregamento sob demanda** quando usuário chega ao final da lista
- **Cache inteligente** para performance otimizada
- **Estados de loading** para feedback visual

## Funcionalidades Implementadas

### ✅ Concluído

- [x] Lista de top notícias com pull to refresh
- [x] Sistema de busca com filtros
- [x] Tela de detalhes com conteúdo completo
- [x] **Infinity scroll** na tela de detalhes
- [x] Compartilhamento de notícias
- [x] Abertura de artigo original
- [x] **ESLint + Prettier** para qualidade de código
- [x] Interface responsiva e otimizada
- [x] Estados de loading e erro
- [x] Cache inteligente com React Query

### 🔮 Próximas Funcionalidades

- [ ] Favoritar notícias
- [ ] Notificações push
- [ ] Categorias de notícias
- [ ] Modo offline
- [ ] Busca com mais filtros avançados

## Licença

MIT License
