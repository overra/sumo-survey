# SumoSurvey

A super simple survey system!

## Dependencies

The following are the exact versions of the dependencies installed.

- node/io.js 2.3.4
- MySQL 5.6.25
- npm 2.12.1
- gulp.js 3.9.0

```
# Install git, MySQL and built essentials
sudo apt-get install git mysql-server-5.5 build-essential

# Install nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.25.4/install.sh | bash

# Install node.js 2.3.4 and npm
nvm install 2.3.4

# Install gulp
npm install -g gulp
```

## Install

If all dependencies above are met here's how you can get started.

```
git clone https://github.com/overra/sumo-survey.git
cd sumo-survey

# install module dependencies
npm install

# copy the sample configuration and make the necessary changes
mv config.sample.json config.json

# run the following to create the database and survey admin account
./bin/setup

# run the following to build and run the app
gulp watch
```
