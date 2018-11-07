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

>Note: You will see this symbol " | " in every `<action>`, and it means an alias of the action. So you can choose to use the left or the right side.

#### # `saveArticle`
     
   ```
   $ to-read saveArticle <url> | sa <url>
   ```
   
   ##### ****Opt*** :
   
   - `--tags <your tags> | -t <your tags>` To add tags to your article, each tag separated by comma.

   - `--information <your info> | -i <your info>` To add description to the article.

>You can save some article with this.
  
#### # `updateArticle`

```
$ to-read updateArticle <id> | ua <id>
```

   ##### ****Opt*** :
   
   - `--tags <your tags> | -t <your tags>` To add tags to your article, each tag separated by comma.

   - `--information <your info> | -i <your info>` To add description to the article.

   - `--addTags <true/false> | -a <true/false>` To check whether or not you want to add the tags (true) or delete the tags (false) given in `--tags`.

>You can update the article you saved with this.

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

>The different between this and `open` is, with this you can select and open multiple article at once without having to type the id or even remember it.

#### # `deleteArticle <id>`
```
$ to-read deleteArticle <id> | da <id>
```

>With this you can delete article by their id.

#### # `clearStorage`
```
$ to-read clearStorage | cla
```

> Use this if you want to clear all the article in you storage. It will remove all the data you saved.

---

### Features developed

- [x] Save an article. Just give the URL and the title of the article will be extracted from the website.
- [x] Tag your articles to make it more organized.
- [x] Get a list of all articles saved.
- [x] Open multiple article at once.
- [x] Delete an article.
- [x] Open an article in your default browser using its ID.
- [x] Update article tags and information.

### Features to be developed

- Update an article with a status: "To Read", "Reading", "Read", among others.
- Search by tags.
- Archive articles.
- Delete article by selecting it. So, we don't need to know the id of each article.
- Backup to the cloud (Google Drive or any other storage service).
- Sync your articles through multiple PCs.
- Make the styling more cool.

Please feel free to give comments about the features listed and suggest new ones.
