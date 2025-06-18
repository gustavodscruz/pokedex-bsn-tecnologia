# Pokédex Angular + Ionic

Uma Pokédex moderna desenvolvida com Angular e Ionic, oferecendo uma interface responsiva e intuitiva para explorar o mundo Pokémon!

## ✨ Funcionalidades

- 📱 Interface responsiva para mobile e desktop
- 🔍 Busca de Pokémon por nome
- ⭐ Sistema de favoritos
- 📊 Visualização detalhada de status
- 🎨 Cores dinâmicas baseadas no tipo do Pokémon
- 📱 Paginação para navegar entre Pokémon
- 💾 Cache local para melhor performance

## 🚀 Tecnologias

- [Angular](https://angular.io/)
- [Ionic Framework](https://ionicframework.com/)
- [PokeAPI](https://pokeapi.co/)
- TypeScript
- SCSS

## 📦 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Angular CLI
- Ionic CLI

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://seu-repositorio/pokedex.git
cd pokedex
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
ionic serve
```

O aplicativo estará disponível em `http://localhost:8100/`

## 🏗️ Estrutura do Projeto

```
src/
├── app/
│   ├── components/         # Componentes reutilizáveis
│   ├── services/          # Serviços de dados
│   ├── home/             # Página principal
│   └── types/            # Tipos e interfaces
├── assets/               # Recursos estáticos
└── theme/               # Estilos globais
```

## 🎨 Personalização

O projeto utiliza variáveis SCSS para temas, que podem ser encontradas em:
- `src/theme/variables.scss`
- `src/global.scss`

## 📱 Recursos da Interface

- **Lista de Pokémon**: Visualização em grid com cards
- **Detalhes**: Página dedicada com informações detalhadas
- **Favoritos**: Sistema de gerenciamento de favoritos
- **Busca**: Pesquisa em tempo real com debounce
- **Responsividade**: Layout adaptativo para diferentes tamanhos de tela

Espero que gostem!