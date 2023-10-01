FROM php:8.2-fpm-buster

ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/install-php-extensions

RUN chmod +x /usr/local/bin/install-php-extensions && install-php-extensions amqp apcu bcmath blackfire bz2 calendar csv decimal ev event exif gd imagick imap ldap mcrypt memcached mongodb mysqli oauth odbc opcache pgsql pdo_pgsql pdo_mysql redis snappy snmp soap sockets ssh2 xmlrpc yaml zip zookeeper rdkafka

# docker build -t wacdis/php-fpm:8.2 .
