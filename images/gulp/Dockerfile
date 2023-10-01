FROM alpine
COPY ./include/* /project/
RUN apk update && \
    apk upgrade && \
    apk add openssh openrc nodejs npm && \
    npm install -g gulp-cli && \
    mkdir -p /project/html && \
    mkdir -p /project/html/src && \
    mkdir -p /project/html/build && \
    cd /project && \
    npm install
WORKDIR /project
CMD ["gulp", "watch"]

# docker build --no-cache -t wacdis/gulp .
