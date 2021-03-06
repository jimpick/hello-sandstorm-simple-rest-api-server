#!/bin/bash

# When you change this file, you must take manual action. Read this doc:
# - https://docs.sandstorm.io/en/latest/vagrant-spk/customizing/#setupsh

set -euo pipefail
# Install node.js

# Discussion, issues and change requests at:
#   https://github.com/nodesource/distributions
#
# Script to install the NodeSource Node.js 10.x repo onto a
# Debian or Ubuntu system.

export DEBIAN_FRONTEND=noninteractive

#echo "Installing the NodeSource Node.js 10.x repo..."

apt-get update
apt-get install -qq apt-transport-https pkg-config

#curl -sL https://deb.nodesource.com/setup_10.x | bash -

# Actually install node
#apt-get install -qq nodejs git-core g++
apt-get install -qq git-core g++

#curl -O https://capnproto.org/capnproto-c++-0.8.0.tar.gz
#tar zxf capnproto-c++-0.8.0.tar.gz
#cd capnproto-c++-0.8.0
#./configure
#make -j6 check
#make install

curl -fsSL https://deb.nodesource.com/setup_14.x | bash -
apt-get install -y nodejs

npm install -g nodemon

exit 0
