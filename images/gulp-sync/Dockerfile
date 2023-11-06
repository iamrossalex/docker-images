FROM alpine
COPY ./include/* /project/
RUN apk update && \
    apk upgrade && \
    apk add openssh openrc nodejs npm && \
    npm install -g gulp-cli --save-dev && \
    cd /project && \
    npm install --save-dev autoprefixer del sass uglify-js yargs gulp gulp-autoprefixer gulp-cssnano gulp-file-include gulp-plumber gulp-rename gulp-sass gulp-uglify
WORKDIR /project
CMD ["gulp"]

# sudo docker build --no-cache -t wacdis/gulp-sync .

