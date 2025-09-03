# News App React Native

Um aplicativo de notícias desenvolvido com React Native e Expo que integra com a News API.

## Funcionalidades

- 📰 **Top Notícias**: Visualize as principais notícias do momento
- 🔍 **Busca com Filtros**: Pesquise notícias com filtros avançados
- 🌙 **Modo Escuro/Claro**: Alternância entre temas
- 📱 **Navegação por Abas**: Interface intuitiva com duas abas principais
- 🔄 **Pull to Refresh**: Atualize as notícias puxando para baixo
- 🎨 **UI Moderna**: Interface elegante usando React Native Paper

## Arquitetura

O projeto segue o padrão **MVVM (Model-View-ViewModel)**:

```
src/
├── components/     # Componentes reutilizáveis (View)
├── screens/        # Telas da aplicação (View)
├── viewmodels/     # Lógica de negócio com React Query (ViewModel)
├── models/         # Modelos de dados
├── services/       # Serviços de API
├── contexts/       # Contextos React (Theme)
├── navigation/     # Configuração de navegação
├── themes/         # Temas claro e escuro
├── types/          # Definições TypeScript
└── utils/          # Utilitários e configurações
```

## Tecnologias Utilizadas

- **React Native** com **Expo**
- **TypeScript** para tipagem estática
- **React Navigation** para navegação
- **React Query (@tanstack/react-query)** para gerenciamento de estado e cache
- **React Native Paper** para componentes de UI
- **Axios** para requisições HTTP
- **AsyncStorage** para persistência local

## Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar News API

1. Acesse [NewsAPI.org](https://newsapi.org/) e crie uma conta gratuita
2. Obtenha sua chave de API
3. Crie um arquivo `.env` na raiz do projeto:

```bash
cp .env.example .env
```

4. Edite o arquivo `.env` e adicione sua API key:

```
NEWS_API_KEY=sua_chave_api_aqui
```

### 3. Executar o aplicativo

```bash
# Para Android
npm run android

# Para iOS (apenas no macOS)
npm run ios

# Para Web
npm run web
```

## Estrutura das Telas

### Top Notícias

- Lista das principais notícias
- Pull to refresh
- Cards com imagem, título, descrição e fonte
- Tap para abrir notícia no navegador

### Busca

- Campo de busca
- Filtros por:
  - Ordenação (mais recentes, relevância, popularidade)
  - Idioma (português, inglês, espanhol)
- Resultados em tempo real
- Contador de resultados encontrados

## Temas

O aplicativo suporta dois temas:

- **Modo Claro**: Interface clara e limpa
- **Modo Escuro**: Interface escura para melhor visualização noturna

O tema é persistido localmente e restaurado quando o app é reaberto.

## Componentes Principais

### NewsCard

Componente reutilizável para exibir notícias com:

- Imagem da notícia (com placeholder se não disponível)
- Título da notícia
- Descrição
- Fonte e data de publicação

### ThemeSwitcher

Botão simples com ícone de sol/lua para alternar entre temas.

## ViewModels (React Query)

### useTopNews

Hook customizado para buscar top notícias:

- Cache de 5 minutos
- Retry automático em caso de erro
- Suporte a pull to refresh

### useSearchNews

Hook customizado para busca de notícias:

- Ativado apenas quando há termo de busca
- Cache de 5 minutos
- Suporte a filtros avançados

## Próximas Funcionalidades

- [ ] Favoritar notícias
- [ ] Compartilhar notícias
- [ ] Notificações push
- [ ] Categorias de notícias
- [ ] Modo offline

## Licença

MIT License
