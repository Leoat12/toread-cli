> Note: In every action you will see this symbol " | "and it means an alias of the action. So you can choose which want you want to choose the longer version or the short one.

#### # `saveArticle <url>`

```
$ to-read saveArticle <url> | sa <url>
```

> Save an article by url.

##### \***_Opt_** :

- `--tags <your tags> | -t <your tags>` To add tags to your article, each tag separated by comma.

- `--information <your info> | -i <your info>` To add description to the article.

#### # `updateArticle <id>`

```
$ to-read updateArticle <id> | ua <id>
```

> Update the article you saved.

##### \***_Opt_** :

- `--tags <your tags> | -t <your tags>` To add tags to your article, each tag separated by comma.

- `--information <your info> | -i <your info>` To add description to the article.

- `--addTags <true/false> | -a <true/false>` To check whether or not you want to add the tags (true) or delete the tags (false) given in `--tags`.

- `--status <status> | -s <status>` To add status to your article. The status you can add is, TO READ, READING, and READ. In All Caps.

#### # `list`

```
$ to-read list | ls
```

> See the list of articles you saved.

#### # `open <id>`

```
$ to-read open <id> | o <id>
```

> Open an article on the browser by their id.

#### # `opens`

```
$ to-read opens | ops
```

> Open article by selecting it. You can select more than one articles.

#### # `deleteArticle <id>`

```
$ to-read deleteArticle <id> | da <id>
```

> Delete article by their id.

#### # `delete`

```
$ to-read delete | dlt
```

> Delete article by selecting it. You can select more than one articles.

#### # `clearStorage`

```
$ to-read clearStorage | cla
```

> Clear all the articles in you storage. It will remove all the data you saved.

---

### Info:

Please just ignore the `< >` part.

> Ex. `saveArticle <url>` is same with `saveArticle url`. Change the url with your article's url.

All data will be saved in your home directory.

`~/.toreadcli/storage.json`
