import * as fs from "fs";
import path from "path";
import os from "os";
import { Article, Status } from "./article";

const { join } = path;

interface FileStructure {
    articles: Article[];
    index: number;
}

export class Storage {
    static storageDir = join(os.homedir(), ".toreadcli");
    static storageFile = join(Storage.storageDir, "storage.json");

    prepareDB() {
        if (!fs.existsSync(Storage.storageDir)) {
            fs.mkdirSync(Storage.storageDir);
        }
        if (!fs.existsSync(Storage.storageFile)) {
            let file: FileStructure = { articles: [], index: 0 };
            fs.writeFileSync(
                Storage.storageFile,
                JSON.stringify(file, null, 3)
            );
        }
    }

    getArticles(): Article[] {
        this.prepareDB();

        let file: FileStructure = JSON.parse(
            fs.readFileSync(Storage.storageFile, "utf8")
        );

        return file.articles;
    }

    getArticle(id: number): Article | undefined {
        this.prepareDB();

        let file: FileStructure = JSON.parse(
            fs.readFileSync(Storage.storageFile, "utf8")
        );
        return file.articles.find(a => a.id == id);
    }

    saveArticle(article: Article): Article {
        this.prepareDB();

        let file: FileStructure = JSON.parse(
            fs.readFileSync(Storage.storageFile, "utf8")
        );
        file.index += 1;
        article.id = file.index;
        file.articles.push(article);
        fs.writeFileSync(Storage.storageFile, JSON.stringify(file, null, 3));

        return article;
    }

    updateArticle(
        id: number,
        addTags: boolean,
        description?: string,
        tags?: string[],
        status?: Status
    ): Article | undefined {
        this.prepareDB();

        let file: FileStructure = JSON.parse(
            fs.readFileSync(Storage.storageFile, "utf8")
        );
        let existentArticle: Article | undefined = file.articles.find(
            a => a.id == id
        );

        if (existentArticle) {
            file.articles = file.articles.filter(a => a.id != id);

            if (description) existentArticle.description = description;
            if (tags) {
                if (existentArticle.tags) {
                    if (addTags.valueOf() == true) {
                        for (const tag of tags) {
                            existentArticle.tags.push(tag);
                        }
                    } else {
                        for (const tag of tags) {
                            existentArticle.tags = existentArticle.tags.filter(
                                (value, index, arr) => {
                                    return value !== tag;
                                }
                            );
                        }
                    }
                } else {
                    if (addTags) {
                        existentArticle.tags = [];
                        for (const tag of tags) {
                            existentArticle.tags.push(tag);
                        }
                    }
                }
            }

            if (status) existentArticle.status = status;

            file.articles.push(existentArticle);
            fs.writeFileSync(
                Storage.storageFile,
                JSON.stringify(file, null, 3)
            );

            return existentArticle;
        } else {
            return undefined;
        }
    }

    deleteArticle(id: number): boolean {
        this.prepareDB();

        let file: FileStructure = JSON.parse(
            fs.readFileSync(Storage.storageFile, "utf8")
        );

        let updatedArticleArray: Article[] = file.articles.filter(
            a => a.id != id
        );

        if (file.articles.length > updatedArticleArray.length) {
            file.articles = updatedArticleArray;
            fs.writeFileSync(
                Storage.storageFile,
                JSON.stringify(file, null, 3)
            );
            return true;
        } else {
            return false;
        }
    }

    deleteAll(art: Article[]): void {
        art.forEach(article => {
            this.prepareDB();

            let file: FileStructure = JSON.parse(
                fs.readFileSync(Storage.storageFile, "utf8")
            );
            let updatedArticleArray: Article[] = file.articles.filter(
                a => a.id != article.id
            );
            file.articles = updatedArticleArray;
            fs.writeFileSync(
                Storage.storageFile,
                JSON.stringify(file, null, 3)
            );
        });
    }

    clearArticles(): boolean {
        fs.unlinkSync(Storage.storageFile);

        if (!fs.existsSync(Storage.storageFile)) {
            return true;
        } else {
            return false;
        }
    }
}
