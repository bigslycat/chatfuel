# Chatfuel challenge

## Requirements

- node — `>=8.0.0`
- yarn — `1.3.2`

## Install

```sh
git clone https://github.com/bigslycat/chatfuel.git
cd chatfuel
yarn install
```

## Dev run

```sh
API_URL=//example.com/api/... yarn start
```

## Build

```sh
API_URL=//example.com/api/... yarn build
```

## About

- Я воспользовался [SwaggerHub](https://swaggerhub.com), чтобы мокнуть API. Мок API доступен
  [здесь](//virtserver.swaggerhub.com/bigslycat/chatfuel/1.0.0).

- Если при сборке и тестовом запуске не указывать `API_URL`, то приложение будет использовать мок.
  Конечно же, в таком случае фильтр работать не будет. Как и переход по `nextPageUrl`.
  Как это выглядит, можно посмотреть [здесь](https://bigslycat.github.io/chatfuel/).

- Debounce запросов в полторы секунды обусловлен ограничениями SwaggerHub.

- По дизайну и размеру бандла сильно не упарывался, поэтому взял [material-ui](https://github.com/mui-org/material-ui).

- На [rxjs](https://github.com/ReactiveX/RxJS) всё сделал для прикола.
