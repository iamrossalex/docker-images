FROM node:18-bullseye

# Set environment variables
ENV NODE_ENV=development
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Create project directory
WORKDIR /project

# Copy only necessary files in separate layers
# COPY ./include/package*.json ./
COPY ./include/gulpfile.js ./

# Install system dependencies (if needed)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    git \
    openssh-client && \
    rm -rf /var/lib/apt/lists/*

# Install global npm packages
RUN npm install -g gulp-cli

# Install project dependencies
RUN cd /project && npm install --save-dev \
    autoprefixer \
    del \
    sass \
    uglify-js \
    yargs \
    gulp \
    gulp-autoprefixer \
    gulp-cssnano \
    gulp-file-include \
    gulp-plumber \
    gulp-rename \
    gulp-sass \
    gulp-uglify \
    gulp-cached \
    gulp-remember \
    gulp-sourcemaps \
    through2

# Copy remaining project files
COPY ./include/ .

# Set the default command
CMD ["gulp"]

# Build with: docker build --no-cache -t wacdis/gulp-gpt .