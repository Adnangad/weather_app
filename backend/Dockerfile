FROM php:8.2-cli

# Installs dependencies
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libjpeg-dev libfreetype6-dev zip unzip libonig-dev libxml2-dev sqlite3 libsqlite3-dev \
    && docker-php-ext-install pdo pdo_sqlite pdo_mysql mbstring exif pcntl bcmath gd

# Installs Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Sets the working directory
WORKDIR /var/www

# Copys project files
COPY . .

# Installs PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Runs the Artisan commands to clear cache and optimize
RUN php artisan config:clear && php artisan cache:clear && php artisan optimize

# Expose port Laravel will run on
EXPOSE 10000

# Starts the Laravel app
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=10000"]
