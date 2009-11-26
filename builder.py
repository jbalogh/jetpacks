#!/usr/bin/env python

import jinja2
from path import path
import yaml


def read_yaml(file):
    """
    Read yaml-frontmatter, as in jekyll.

    If '---' is the first or second line of a file, any text up to the next
    '---' will be parsed as yaml.
    """
    lines = file.open().read().splitlines()
    if '---' in lines[:2]:
        first = lines.index('---')
        second = lines.index('---', first + 1)
        return yaml.load('\n'.join(lines[first:second]))
    else:
        return {}


def write_article(env, article):
    template = env.get_template(str(article))
    outfile = article.dirname() / 'index.html'
    context = read_yaml(article)

    # Tell the template how deep it is in the relative file structure.
    depth = '../' * article.count('/')
    open(outfile, 'w').write(template.render(depth=depth, **context))

    return context['title']


def main():
    env = jinja2.Environment(loader=jinja2.FileSystemLoader('.'))
    articles = map(lambda s: path(s.lstrip('./')),
                   path('.').walkfiles('article.html'))
    titles = {}

    for article in articles:
        title = write_article(env, article)
        titles[title] = article.dirname() / 'index.html'

    template = env.get_template('index.html.tmpl')
    open('index.html', 'w').write(template.render(articles=titles))


if __name__ == '__main__':
    main()
