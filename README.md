# ToRead CLI

## A CLI application to save and organize your development (and others) readings!

> **The project is still under development and any help is welcome!**

---

## Install

This project is still under development so please, don't expect an easy way to run this. Maybe later we will try to make it as an NPM Package but for now, do this:

1. Open your terminal.

2. Clone this repository :

```
$ git clone https://github.com/Leoat12/toread-cli.git
```

3. Run this :

```
$ cd toread-cli && npm install
```

4. Then install it as npm package :

```
$ npm install -g ./
```

---

## Usage

To use it you can just type,

```
$ to-read <action>
```

#### **Here is the list of actions that you can run (for now)**:

- [`saveArticle <url>`](./ACTIONS.md#-savearticle-url)
- [`updateArticle <id>`](./ACTIONS.md#-updatearticle-id)
- [`list`](./ACTIONS.md#-list)
- [`open <id>`](./ACTIONS.md#-open-id)
- [`opens`](./ACTIONS.md#-opens)
- [`deleteArticle <id>`](./ACTIONS.md#-deletearticle-id)
- [`delete`](./ACTIONS.md#-delete)
- [`clearStorage`](./ACTIONS.md#-clearstorage)

> You can click the action to see full docs of the action or you can go [here to see the full documentation](./ACTIONS.md "LIST OF ACTIONS").

---

## Features Developed

- Save an article. Just give the URL and the title of the article will be extracted from the website.
- Tag your articles to make it more organized.
- Get a list of all articles saved.
- Open multiple article at once.
- Delete an article.
- Open an article in your default browser using its ID.
- Update article tags and information.
- Delete article by selecting it. So, we don't need to know the id of each article.
- Update an article with a status: "TO READ", "READING", "READ", among others.

## Features To Develop

- Search by tags.
- Archive articles.
- Backup to the cloud (Google Drive or any other storage service).
- Sync your articles through multiple PCs.
- Make the styling more cool.

Please feel free to give comments about the features listed and suggest new ones.
