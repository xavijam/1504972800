#!/bin/sh
nvm use 7.2.1
brunch build
git subtree push --prefix public origin gh-pages