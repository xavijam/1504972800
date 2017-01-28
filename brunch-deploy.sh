#!/bin/sh
echo 'Building page'
brunch build
echo 'Commit public folder'
git add --all
git commit -m "Committing public folder"
git push origin new-page
echo 'Publishing to GH-pages'
git push origin `git subtree split --prefix public new-page`:gh-pages --force