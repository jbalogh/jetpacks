#!/bin/zsh

REPO=$(dirname $(pwd))
GH=_gh-pages

# Update our local gh-pages branch
git checkout gh-pages && git pull && git checkout -

# Checkout the gh-pages branch, if necessary.
if [[ ! -d $GH ]]; then
    git clone $REPO $GH
    cd $GH
    git checkout -b gh-pages origin/gh-pages
    cd ..
fi

# Update the _gh-pages target dir.
cd $GH && git pull && cd ..

zurg
cp -r _build/* $GH

cd $GH

# Clean up that awful trailing whitespace.
ack -f | xargs perl -pi -e 's/ +$//'

# Commit.
git add .
git commit -am "gh-pages build on $(date)"
git push origin gh-pages
