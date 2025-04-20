FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git curl libpng-dev libjpeg-dev libfreetype6-dev zip unzip libonig-dev libxml2-dev \
    && docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd

# installs composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# sets the working directory
WORKDIR /var/www

COPY . .

# installs PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# sets permissions
RUN chown -R www-data:www-data /var/www

EXPOSE 9000
CMD ["php-fpm"]