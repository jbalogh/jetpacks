# Not an executable so it keeps the same python environment.

ROOT="gh-pages"

./builder.py

for f in $(ack -f | ack -v gh-pages)
    D="$ROOT/$(dirname $f)" && mkdir -p $D && cp $f $D

cp -r media $ROOT
