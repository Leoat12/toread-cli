# ToRead CLI
## A CLI to save and organize your development (and others) readings! 

**The project is under development and any help is welcome!** 

### How to Install and using the app
This project is still under development so please don't expect easy way to do this. Maybe later we will try to make it as an NPM Package but for now, do this:

1. Clone this repository
`git clone <url>`

2. Cd to inside the folder

3. And run `npm install`

4. Then run this `npm install -g ./` this will install the app as an NPM package.

To use it you have to type `to-read` and then the action you want to run.
Here the list of action you can run:
+ `to-read saveArticle <url>`
To save article.
+ `to-read list`
To see all the list of article you have saved.
+ `to-read open <id>`
To open the saved article by the id. 
+ `to-read deleteArticle <id>`
To delete the article by the id.

### Features developed

+ Save an article. Just give the URL and the title of the article will be extracted from the website. 
+ Tag your articles to make it more organized
+ Get a list of all articles saved
+ Delete an article
+ Open an article in your default browser using its ID.

### Features to be developed

+ Update an article with a status: "To Read", "Reading", "Read", among others.
+ Search by tags
+ Archive articles
+ Backup to the cloud (Google Drive or any other storage service)
+ Sync your articles through multiple PCs.

Please feel free to give comments about the features listed and suggest new ones. 
