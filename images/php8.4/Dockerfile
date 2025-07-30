FROM php:8.4-cli

# Add the PHP extension installer
ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN chmod +x /usr/local/bin/install-php-extensions

<<<<<<< HEAD
RUN chmod +x /usr/local/bin/install-php-extensions && install-php-extensions amqp apcu bcmath blackfire bz2 calendar csv decimal ev event exif gd imagick imap ldap memcached mongodb mysqli oauth odbc opcache pgsql pdo_pgsql pdo_mysql rdkafka redis snappy snmp soap sockets ssh2 swoole xmlrpc yaml zip

=======
# Install required PHP extensions
RUN install-php-extensions bcmath bz2 gd imagick mysqli pgsql pdo_mysql pdo_pgsql redis mongodb sockets swoole zip sodium 
>>>>>>> dcb4fbff6c3ccf9ce2e31ffc0a49b46cb4ef0152
# docker build --no-cache -t wacdis/php:8.4 .
# 2024/12/17 - Installs PHP 8.4.1, mcrypt can't be installed requires 8.4.0 maximum
