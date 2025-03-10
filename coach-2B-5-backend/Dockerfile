FROM php:8.2-alpine

# Install system dependencies
RUN apk add --no-cache \
    mariadb-client \
    libzip-dev \
    zip \
    unzip \
    git \
    bash

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install Symfony CLI
RUN curl -1sLf 'https://dl.cloudsmith.io/public/symfony/stable/setup.alpine.sh' | bash
RUN apk add symfony-cli

WORKDIR /var/www

# Copy project files
COPY . .

# Install dependencies
RUN composer install

# Set permissions
RUN chown -R www-data:www-data var

EXPOSE 8000

# Start Symfony server with --allow-http and listening on all IPs
CMD ["symfony", "serve", "--port=8000", "--no-tls", "--allow-http", "--allow-all-ip"]
