import * as fs from "fs";
import os from "os";
import path from "path";
import { Article, Status } from "./article";

const { join } = path;

interface FileStructure {
    articles: Article[];
    index: number;
}

export class Storage {
    public storageDir = join(os.homedir(), ".toreadcli");
    public storageFile = join(this.storageDir, "storage.json");
    public getArticles(): Article[] {
        this.prepareDB();

        const file: FileStructure = this.getFileData();

        return file.articles;
    }

    public getArticle(id: number): Article | undefined {
        this.prepareDB();

        const file: FileStructure = this.getFileData();

        return file.articles.find((a) => a.id == id);
    }

    public getArticleByUrl(url: string): Article | undefined {
        this.prepareDB();

        const file: FileStructure = this.getFileData();

        return file.articles.find((a) => a.url == url);
    }

    public getArticlesByTag(tag: string): Article[] {
        this.prepareDB();

        const file: FileStructure = this.getFileData();

        return file.articles.filter((a) => a.tags && a.tags.includes(tag));
    }

    public saveArticle(article: Article): Article {
        this.prepareDB();

        const file: FileStructure = this.getFileData();

        file.index += 1;
        article.id = file.index;
        file.articles.push(article);
        fs.writeFileSync(this.storageFile, JSON.stringify(file, null, 3));

        return article;
    }

    public updateArticle(
        id: number,
        addTags: boolean,
        description?: string,
        tags?: string[],
        status?: Status,
    ): Article | undefined {
        this.prepareDB();

        const file: FileStructure = this.getFileData();

        const existentArticle: Article | undefined = file.articles.find(
            (a) => a.id == id,
        );

        if (existentArticle) {
            file.articles = file.articles.filter((a) => a.id != id);

            if (description) {
                existentArticle.description = description;
            }
            if (tags) {
                if (existentArticle.tags) {
                    if (addTags.valueOf() == true) {
                        for (const tag of tags) {
                            existentArticle.tags.push(tag);
                        }
                    } else {
                        for (const tag of tags) {
                            existentArticle.tags = existentArticle.tags.filter(
                                (value) => {
                                    return value !== tag;
                                },
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

            if (status) {
                existentArticle.status = status;
            }
            file.articles.push(existentArticle);
            fs.writeFileSync(this.storageFile, JSON.stringify(file, null, 3));

            return existentArticle;
        } else {
            return undefined;
        }
    }

    public deleteArticle(id: number): boolean {
        this.prepareDB();

        const file: FileStructure = this.getFileData();

        const updatedArticleArray: Article[] = file.articles.filter(
            (a) => a.id != id,
        );

        if (file.articles.length > updatedArticleArray.length) {
            file.articles = updatedArticleArray;
            fs.writeFileSync(this.storageFile, JSON.stringify(file, null, 3));
            return true;
        } else {
            return false;
        }
    }

    public deleteAll(art: Article[]): void {
        art.forEach((article) => {
            this.prepareDB();

            const file: FileStructure = this.getFileData();
            file.articles = file.articles.filter((a) => a.id != article.id);
            fs.writeFileSync(this.storageFile, JSON.stringify(file, null, 3));
        });
    }

    public clearArticles(): boolean {
        fs.unlinkSync(this.storageFile);

        return !fs.existsSync(this.storageFile);
    }
    private prepareDB() {
        if (!fs.existsSync(this.storageDir)) {
            fs.mkdirSync(this.storageDir);
        }
        if (!fs.existsSync(this.storageFile)) {
            const file: FileStructure = { articles: [], index: 0 };
            fs.writeFileSync(this.storageFile, JSON.stringify(file, null, 3));
        }
    }

    private getFileData(): FileStructure {
        return JSON.parse(fs.readFileSync(this.storageFile, "utf8"));
    }
}
