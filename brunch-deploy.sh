#!/bin/sh
echo 'Building page'
brunch build --production
echo 'Commit public folder'
git add --all
git commit -m "Committing public folder"
git push origin master
echo 'Publishing to GH-pages'
git push origin `git subtree split --prefix public master`:gh-pages --force