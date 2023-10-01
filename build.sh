#!/bin/bash

cd ./images/gulp
docker build --no-cache -t wacdis/gulp .

cd ../nginx-quic
docker build --no-cache -t wacdis/nginx-quic .

cd ../php8.2
docker build --no-cache -t wacdis/php:8.2 .

cd ../php8.2-fpm
docker build --no-cache -t wacdis/php-fpm:8.2 .

docker pull mysql

cd ../..