### GENERATIONS DEX


## Sobre

O Generations Dex é uma aplicação web que permite conhecer mais os pokemons de cada geração. É possível buscar um pokemon por nome e também visualizar os seus detalhes. 


## Base de Dados
	
Para este sistema, foi utilizado a [PokeApi](https://pokeapi.co/), onde nós conseguimos retornar diversas informações sobre o mundo Pokémon.

## MVP da Aplicação

-   Lista de gerações pokemon
-   Informações sobre uma geração específica
-   Lista de pokemons de uma geração específica
-   Lista de versões de jogos de uma geração específica
-   Informações sobre um pokemon específico

## Tecnologias

 - VueJS
 - Axios
 - Lodash
 - Vuex
 - Vue Router

## Como utilizar
### 1ª Opção

Você pode acessar clicando no link abaixo:
[Generations Dex](https://generationsdex.netlify.app/)

### 2ª Opção
1. Abra o terminal e digite o seguinte
```sh
git clone <url-repositorio>
```

2. Entre na pasta do projeto via terminal e digite:
```sh
yarn install
```

3. Por último, inicie a aplicação com:
 ```sh
yarn serve
```

Para ver o projeto localmente, acesse

> localhost:8080

## Estrutura da Aplicação
* assets/ `Onde contém as imagens e fontes utilizadas no projeto`
* components/ `Os componentes que podem ser utilizados na aplicação.`
* views/ `Onde contém os arquivos que criam as rotas das páginas`
* store/ `Onde contém os estados globais`
* api/ `Onde contém as requisiões realizadas a API`
* styles/ `Onde contém variáveis de estilo reutilizáveis`
* router/ `Onde contém as configurações de rotas`
