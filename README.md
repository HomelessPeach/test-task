## Инструкция по установке

### 1. Клонирование проекта из репозитория.

### `git clone https://github.com/HomelessPeach/test-task.git`

*********

### 2. Сборка клиентской части приложения.

2.1. Переход в клиентскую часть.

### `cd client`

2.2. Установка зависимостей. 

### `npm install`

2.3. Сборка приложения. 

### `npm run build`

2.4. Создание директории, в которой будет храниться клиентское приложение на сервере

### `mkdir -p ../server/src/public`

2.4. Перемещенте собранного приложения на сервер. 

### `cp -r build ../server/src/public/app`

*********

### 3. Настройка сервера.

3.1. Переход в клиентскую часть.

### `cd ../server`

3.2. Установка зависимостей.

### `npm install`

3.3. Настройка переменных окружения.

### `nano .env`

Заполните данные для своей системы

DOMAIN="localhost" – домен, на котором будет запущено приложении\
PORT=8080 – порт, на котором будет запущено приложение\
POSTGRES_HOST="127.0.0.0" – IP-адрес базы данных PostgreSQL\
POSTGRES_DATABASE="test_tasks" – название базы данных PostgreSQL (скопируйте из этого файла)ё
POSTGRES_PORT=5432 – порт базы данных PostgreSQL
POSTGRES_USER="postgres" – пользователь базы данных PostgreSQL
POSTGRES_PASSWORD="qwerty12345" – пароль пользователя базы данных PostgreSQL

*********

### 4. Настройка базы данных.

Запустите скрипт находящийся в файле server/init-db.sql в своей базе данных PostgreSQL

*********

### 5. Запуск приложения.

Находясь в папке server введите команду

### `npm run start`