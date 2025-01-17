FROM php:8.4-cli

# Add the PHP extension installer
ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN chmod +x /usr/local/bin/install-php-extensions

# Install required PHP extensions
RUN install-php-extensions bcmath bz2 gd imagick mysqli pgsql pdo_mysql pdo_pgsql redis mongodb sockets swoole zip sodium 
# docker build --no-cache -t wacdis/php:8.4 .
# 2024/12/17 - Installs PHP 8.4.1, mcrypt can't be installed requires 8.4.0 maximum
