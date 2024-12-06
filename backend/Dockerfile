# Use the official PHP image
FROM php:8.0-fpm

# Install dependencies
RUN apt-get update && apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev libzip-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd zip pdo pdo_mysql

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set Working Directory
WORKDIR /var/www

# Copy existing application directory permissions
COPY . .

# Install Laravel Dependencies
RUN composer install

# Generate the application key
RUN php artisan key:generate --no-interaction

# Expose port
EXPOSE 8081

# Start PHP server
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8081"]