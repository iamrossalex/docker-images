FROM php:8.3-cli-bookworm

ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/

RUN chmod +x /usr/local/bin/install-php-extensions && install-php-extensions amqp apcu bcmath blackfire bz2 calendar csv decimal ev event exif gd imap ldap mcrypt memcached mongodb mysqli oauth odbc opcache pgsql pdo_pgsql pdo_mysql redis snappy snmp soap sockets ssh2 swoole xmlrpc yaml zip

# docker build --no-cache -t wacdis/php:8.3 .
