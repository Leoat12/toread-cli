import * as fs from "fs";

import {Article, Status} from "./article";

interface FileStructure {
    articles: Article[];
    index: number;
}

export class Storage {
    public getArticles(): Article[] {
        this.prepareDB();

        const file: FileStructure = JSON.parse(
            fs.readFileSync("file.json", "utf8"),
        );

        return file.articles;
    }

    public getArticle(id: number): Article | undefined {
        this.prepareDB();

        const file: FileStructure = JSON.parse(
            fs.readFileSync("file.json", "utf8"),
        );
        return file.articles.find((a) => a.id == id);
    }

    public saveArticle(article: Article): Article {
        this.prepareDB();

        const file: FileStructure = JSON.parse(
            fs.readFileSync("file.json", "utf8"),
        );
        file.index += 1;
        article.id = file.index;
        file.articles.push(article);
        fs.writeFileSync("file.json", JSON.stringify(file));

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

        const file: FileStructure = JSON.parse(
            fs.readFileSync("file.json", "utf8"),
        );
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
            fs.writeFileSync("file.json", JSON.stringify(file));

            return existentArticle;
        } else {
            return undefined;
        }
    }

    public deleteArticle(id: number): boolean {
        this.prepareDB();

        const file: FileStructure = JSON.parse(
            fs.readFileSync("file.json", "utf8"),
        );

        const updatedArticleArray: Article[] = file.articles.filter(
            (a) => a.id != id,
        );

        if (file.articles.length > updatedArticleArray.length) {
            file.articles = updatedArticleArray;
            fs.writeFileSync("file.json", JSON.stringify(file));
            return true;
        } else {
            return false;
        }
    }

    public deleteAll(art: Article[]): void {
        art.forEach((article) => {
            this.prepareDB();

            const file: FileStructure = JSON.parse(
                fs.readFileSync("file.json", "utf8"),
            );
            file.articles = file.articles.filter(
                (a) => a.id != article.id,
            );
            fs.writeFileSync("file.json", JSON.stringify(file));
        });
    }

    public clearArticles(): boolean {
        fs.unlinkSync("./file.json");

        if (!fs.existsSync("file.json")) {
            return true;
        } else {
            return false;
        }
    }

    private prepareDB() {
        if (!fs.existsSync("file.json")) {
            const file: FileStructure = { articles: [], index: 0 };
            fs.writeFileSync("file.json", JSON.stringify(file));
        }
    }
}
