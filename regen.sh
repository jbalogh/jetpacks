# Not an executable so it keeps the same python environment.

ROOT="gh-pages"

./builder.py

for f in $(find . -name index.html -or -name '*.js' | grep -v "./$ROOT")
    D="$ROOT/$(dirname $f)" && mkdir -p $D && cp $f $D

cp -r media $ROOT
