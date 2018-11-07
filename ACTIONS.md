> Note: In every action you will see thi symbol " | "and it means an alias of the action. So you can choose which want you want to choose the longer version or short one.

#### # `saveArticle <url>`

```
$ to-read saveArticle <url> | sa <url>
```

##### \***_Opt_** :

- `--tags <your tags> | -t <your tags>` To add tags to your article, each tag separated by comma.

- `--information <your info> | -i <your info>` To add description to the article.

> You can save some article with this.

#### # `updateArticle <id>`

```
$ to-read updateArticle <id> | ua <id>
```

##### \***_Opt_** :

- `--tags <your tags> | -t <your tags>` To add tags to your article, each tag separated by comma.

- `--information <your info> | -i <your info>` To add description to the article.

- `--addTags <true/false> | -a <true/false>` To check whether or not you want to add the tags (true) or delete the tags (false) given in `--tags`.

> You can update the article you saved with this.

#### # `list`

```
$ to-read list | ls
```

> With this you can see the list of article you saved.

#### # `open <id>`

```
$ to-read open <id> | o <id>
```

> With this you can open an article on the browser by their id.

#### # `opens`

```
$ to-read opens | ops
```

> The different between this and `open` is, with this you can select and open multiple article at once without having to type the id or even remember it.

#### # `deleteArticle <id>`

```
$ to-read deleteArticle <id> | da <id>
```

> With this you can delete article by their id.

#### # `clearStorage`

```
$ to-read clearStorage | cla
```

> Use this if you want to clear all the article in you storage. It will remove all the data you saved.
