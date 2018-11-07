# ToRead CLI

## A CLI to save and organize your development (and others) readings!

**The project is still under development and any help is welcome!**

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

To use it you can just type `to-read <action>` and then the type of action you want to run.

### **Here is the list of actions that you can run (for now)**:

> Note: You will see this symbol " | " in every `<action>`, and it means an alias of the action. So you can choose to use the left or the right side.

- [`saveArticle <url>`](./ACTIONS.md#-savearticle-url)
- [`updateArticle <id>`](./ACTIONS.md#-updatearticle-id)
- [`list`](./ACTIONS.md#-list)
- [`open <id>`](./ACTIONS.md#-open-id)
- [`opens`](./ACTIONS.md#-opens)
- [`deleteArticle <id>`](./ACTIONS.md#-deletearticle-id)
- [`clearStorage`](./ACTIONS.md#-clearstorage)

> You can click the action to see full docs of the action or you can go [here to see the full documentation](./ACTIONS.md "LIST OF ACTIONS").

---

## Features To Do

- [x] Save an article. Just give the URL and the title of the article will be extracted from the website.
- [x] Tag your articles to make it more organized.
- [x] Get a list of all articles saved.
- [x] Open multiple article at once.
- [x] Delete an article.
- [x] Open an article in your default browser using its ID.
- [x] Update article tags and information.
- [ ] Update an article with a status: "To Read", "Reading", "Read", among others.
- [ ] Search by tags.
- [ ] Archive articles.
- [ ] Delete article by selecting it. So, we don't need to know the id of each article.
- [ ] Backup to the cloud (Google Drive or any other storage service).
- [ ] Sync your articles through multiple PCs.
- [ ] Make the styling more cool.

Please feel free to give comments about the features listed and suggest new ones.
