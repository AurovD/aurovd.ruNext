# Установка

1. `npm install` - устанавливаем все зависимости
2. Для создания настроект приложения, необходимо скопировать файл .env.example и сохранить как .env в папке server
# Запуск

Необходимо запустить сервер и NextJS. Перед запуском, сделайтей `npx sequelize-cli db:migrate` и далее:

1. `npm run server` - запускает Express-сервер
2. `npm run dev` - запускает NextJS-приложение
3. `docker run -d -p 3000:3000 -d -p 3001:3001 -v /var/www/portfolio/projects:/app/public/projects aurovdm/aurovd:v` - запуск на сервере