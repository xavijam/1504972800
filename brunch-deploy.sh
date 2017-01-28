#!/bin/sh
echo 'Building page'
brunch build
echo 'Publishing to GH-pages'
git push origin `git subtree split --prefix public new-page`:refs/heads/gh-pages --force
