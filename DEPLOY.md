# Инструкция по деплою на GitHub и Vercel

## Шаг 1: Создать репозиторий на GitHub

### Вариант A: Через веб-интерфейс GitHub (рекомендуется)

1. Откройте https://github.com/new
2. Заполните форму:
   - **Repository name:** `ve4erok-website` (или любое другое название)
   - **Description:** "Сайт группы Анонимных Наркоманов ВечерОК в Таллине"
   - **Public** или **Private** (рекомендую Private для начала)
   - ❌ **НЕ** ставьте галочки на "Add README" или ".gitignore" (у нас уже есть)
3. Нажмите **"Create repository"**

### После создания репозитория GitHub покажет инструкции. Выполните:

```bash
cd "C:/Users/User/Documents/Ve4erOk"

# Добавьте удаленный репозиторий (замените YOUR_USERNAME на ваше имя пользователя)
git remote add origin https://github.com/YOUR_USERNAME/ve4erok-website.git

# Переименуйте ветку в main (если нужно)
git branch -M main

# Отправьте код на GitHub
git push -u origin main
```

### Вариант B: Через GitHub Desktop (если установлен)

1. Откройте GitHub Desktop
2. File → Add Local Repository
3. Выберите папку `C:\Users\User\Documents\Ve4erOk`
4. Нажмите "Publish repository"
5. Укажите название и описание
6. Нажмите "Publish"

---

## Шаг 2: Развернуть на Vercel

### Метод 1: Через веб-интерфейс Vercel (проще всего)

1. Откройте https://vercel.com
2. Нажмите **"Sign Up"** или **"Log in"** (можно войти через GitHub)
3. После входа нажмите **"Add New Project"**
4. Выберите **"Import Git Repository"**
5. Найдите ваш репозиторий `ve4erok-website` в списке
6. Нажмите **"Import"**
7. Настройки проекта:
   - **Framework Preset:** Other (оставьте как есть)
   - **Root Directory:** `./` (оставьте как есть)
   - **Build Command:** оставьте пустым
   - **Output Directory:** `./` (или оставьте пустым)
8. Нажмите **"Deploy"**

Vercel автоматически:
- Создаст деплой
- Выдаст вам URL вида `ve4erok-website.vercel.app`
- Будет автоматически обновлять сайт при каждом push в GitHub

### Метод 2: Через Vercel CLI (если хотите через терминал)

```bash
# Установите Vercel CLI
npm install -g vercel

# Войдите в аккаунт
vercel login

# Находясь в папке проекта, выполните
cd "C:/Users/User/Documents/Ve4erOk"
vercel

# Следуйте инструкциям:
# - Set up and deploy? Yes
# - Which scope? (выберите ваш аккаунт)
# - Link to existing project? No
# - Project name? ve4erok-website
# - In which directory is your code? ./
# - Want to override settings? No

# Для продакшн деплоя
vercel --prod
```

---

## Шаг 3: Настройка кастомного домена (опционально)

Если у вас есть свой домен (например, ve4erok.ee):

1. В панели Vercel откройте ваш проект
2. Settings → Domains
3. Добавьте ваш домен
4. Vercel даст вам DNS записи для настройки
5. Добавьте эти записи в настройках вашего доменного регистратора

---

## Готовые команды для копирования

### Если ваш GitHub username: `myusername`

```bash
cd "C:/Users/User/Documents/Ve4erOk"
git remote add origin https://github.com/myusername/ve4erok-website.git
git branch -M main
git push -u origin main
```

### Проверка статуса

```bash
cd "C:/Users/User/Documents/Ve4erOk"
git status
git log --oneline
```

---

## Частые проблемы

### "remote origin already exists"

```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/ve4erok-website.git
```

### Нужно ввести логин и пароль GitHub

GitHub больше не поддерживает аутентификацию по паролю. Используйте:

1. **Personal Access Token:**
   - Откройте https://github.com/settings/tokens
   - Generate new token (classic)
   - Выберите scope: `repo`
   - Используйте токен вместо пароля

2. **GitHub Desktop** (проще)

### Ошибка при push

Если видите ошибку при `git push`, проверьте:
- Правильно ли указан URL репозитория
- Вы вошли в аккаунт GitHub
- У вас есть права на запись в репозиторий

---

## После деплоя

Ваш сайт будет доступен по адресу типа:
- `https://ve4erok-website.vercel.app`
- `https://ve4erok-website-git-main-yourname.vercel.app`

Vercel автоматически:
- ✅ Настроит HTTPS
- ✅ Оптимизирует загрузку
- ✅ Создаст CDN для быстрой доставки
- ✅ Будет обновлять сайт при каждом push

---

## Обновление сайта в будущем

1. Внесите изменения в файлы
2. Сохраните их
3. Выполните:

```bash
cd "C:/Users/User/Documents/Ve4erOk"
git add .
git commit -m "Описание изменений"
git push
```

Vercel автоматически задеплоит новую версию!

---

**Успехов с деплоем!** Если возникнут вопросы, напишите мне.
