# Учебеный проект "Мессенджер"


В данном модуле разрабатывается проект - мессенджер, при использовании только JavaScript, Typescript, CSS и API браузера.

В проект войдут стандартные функции чата:
- регистрация,
- авторизация,
- список чатов,
- обмен сообщениями.

На текущий момент в проекте реализованы реактивные комоненты с использованием базового блока и EventBus, а также используются CSS модули и осуществлён базовый роутинг. Проект является SPA

### [Макет](https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0%3A1)

## Установка и запуск

### Локальный запуск

 - Клонировать репозиторий любым удобным способом

 #### Команды:
 - `npm i` - установка зависимостей
 - `npm run dev` - запуска проекта в режиме разработчика (на 3000 порту)
 - `npm run build` - сборка проекта 

И `npm run build`, и `npm run dev` запускают также проверку eslint и stylelint.

### Деплой

 Задеплоенный проект можно посмотреть по [ссылке](https://deploy--scintillating-churros-7dabfa.netlify.app/src/pages/chats/chats)

## Страницы

- Авторизация http://localhost:3000/signIn
- Регистрация http://localhost:3000/signUp
- 404 http://localhost:3000/pages/404
- 500 http://localhost:3000/pages/500
- Профиль http://localhost:3000/profile
- Изменение пароля http://localhost:3000/profile
- Чат http://localhost:3000/chats



