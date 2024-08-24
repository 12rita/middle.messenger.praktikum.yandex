# Учебеный проект "Мессенджер"


В данном модуле разрабатывается проект - мессенджер, при использовании только JavaScript, Typescript, CSS и API браузера.

В проект войдут стандартные функции чата:
- регистрация,
- авторизация,
- список чатов,
- обмен сообщениями.

 На текущий момент в проекте реализованы реактивные компоненты с использованием базового блока и EventBus, а также используются CSS модули. 
Для обмена сообщениями используется протокол WebSocket. Реализована возможность добавления нового чата (кнопка с плюсом в нижнем левом углу). Также можно удалить чат или отдельных пользователей (зайдя в чат, необходимо нажать на иконку чата в верхней панели).
 
В проекте настроены тесты (mocha, chai и sinon), которые проверяют работоспособность основного блока, xhr-модуля и роутера.

### [Макет](https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0%3A1)

## Установка и запуск

### Локальный запуск

 - Клонировать репозиторий любым удобным способом

 #### Команды:
 - `npm i` - установка зависимостей
 - `npm run dev` - запуска проекта в режиме разработчика (на 3000 порту)
 - `npm run build` - сборка проекта 
 - `npm run lint` - запускают проверку eslint, prettier и stylelint
 - `npm run test` - запускают тесты

`npm run build`, и `npm run dev` запускают также команду lint.
Также настроен precommit, который выполняется перед коммитом и запускает lint и test.

### Деплой

 Задеплоенный проект можно посмотреть по [ссылке](https://deploy--scintillating-churros-7dabfa.netlify.app/src/pages/chats/chats)

## Страницы

- [Авторизация](https://deploy--scintillating-churros-7dabfa.netlify.app/sign-in)
- [Регистрация](https://deploy--scintillating-churros-7dabfa.netlify.app/sign-up)
- [404](https://deploy--scintillating-churros-7dabfa.netlify.app/404)
- [500](https://deploy--scintillating-churros-7dabfa.netlify.app/500)
- [Профиль](https://deploy--scintillating-churros-7dabfa.netlify.app/settings)
- [Изменение пароля](https://deploy--scintillating-churros-7dabfa.netlify.app/settings)
- [Чат](https://deploy--scintillating-churros-7dabfa.netlify.app/messenger)



