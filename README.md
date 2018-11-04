# ToRead CLI

## A CLI to save and organize your development (and others) readings!

**The project is under development and any help is welcome!**

### How to Install the app

This project is still under development so please, don't expect an easy way to run this. Maybe later we will try to make it as an NPM Package but for now, do this:

1. Open your terminal.

2. Clone this repository
   `git clone <url>`

3. And run `cd toread-cli && npm install`

4. Then run this `npm install -g ./` this will install the app as an NPM package.

### How to use the app

To use it you have can just type `to-read` and then the type of action you want to run.

!Ex. `to-read <action>`

Here is the list of actions you can run (for now):

- `saveArticle <url>` or `sa <url>` To save article.
  - `--tags <your tags>` or `-t <your tags>` To add tags to your article, each tag separated by comma.
  - `--information <your info>` or `-i <your info>` To add description to the article.
- `list` or `ls`
  To see all the list of article you have saved.
- `open <id>` or `o <id>`
  To open the saved article by the id.
- `deleteArticle <id>` or `da <id>`
  To delete the article by the id.

### Features developed

- Save an article. Just give the URL and the title of the article will be extracted from the website.
- Tag your articles to make it more organized
- Get a list of all articles saved
- Delete an article
- Open an article in your default browser using its ID.

### Features to be developed

- Update an article with a status: "To Read", "Reading", "Read", among others.
- Search by tags
- Archive articles
- Backup to the cloud (Google Drive or any other storage service)
- Sync your articles through multiple PCs.

Please feel free to give comments about the features listed and suggest new ones.
