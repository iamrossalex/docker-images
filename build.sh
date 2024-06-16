#!/bin/bash

cd ./images/gulp-sync
docker build --no-cache -t wacdis/gulp-sync .

# cd ../nginx-quic
# docker build --no-cache -t wacdis/nginx-quic .

# cd ../php8.2
# docker build --no-cache -t wacdis/php:8.2 .

# cd ../php8.2-fpm
# docker build --no-cache -t wacdis/php-fpm:8.2 .

cd ../php8.3
docker build --no-cache -t wacdis/php:8.3 .

cd ../php8.3-fpm
docker build --no-cache -t wacdis/php-fpm:8.3 .

docker pull mysql

cd ../..