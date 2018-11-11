import { RxHR } from "@akanass/rx-http-request";
import colors from "colors";
import inquirer from "inquirer";
import { JSDOM } from "jsdom";
import opn from "opn";

import { Article, Status } from "./article";
import { Display, PresentationMode } from "./display";
import { Storage } from "./storage";

export class Actions {
    public static storage: Storage = new Storage();

    public static getArticles(): void {
        const articles: Article[] = this.storage.getArticles();
        if (articles.length < 1) {
            Display.printGetArticlesErrorMessage();
        } else {
            articles.forEach((a) => {
                Display.printArticle(a, PresentationMode.LIST);
            });
        }
    }

    public static openArticle(id: number): void {
        const article = this.storage.getArticle(id);
        if (article) {
            opn(article.url);
        } else {
            Display.printOpenErrorMessage();
        }
    }

    public static saveArticle(url: string, description: string, tags?: string): void {
        RxHR.get(url).subscribe(
            (data: any) => {
                if (data.response.statusCode === 200) {
                    const window = new JSDOM(data.body).window;
                    const title = window.document.title;
                    const article: Article = {
                        description,
                        status: Status.ToRead,
                        tags: tags ? tags.split(",") : [],
                        title,
                        url,
                    };

                    Actions.storage.saveArticle(article);

                    Display.printSaveArticleMessage(data.response.statusCode);
                    Display.printArticle(article, PresentationMode.ONE);
                } else {
                    Display.printSaveArticleMessage(data.response.statusCode);
                }
            },
            (err: any) => console.error(err), // Show error in console
        );
    }

    public static updateArticle(id: number, addTags: boolean, description?: string, tags?: string, status?: Status): void{
        
        let tagsArray = tags ? tags.split(",") : undefined;
        let updatedArticle = this.storage.updateArticle(id, addTags, description, tagsArray, status);

        if(updatedArticle){
            Display.printArticle(updatedArticle, PresentationMode.ONE);
        } else {
            Display.printUpdateErrorMessage(id);
        }
    }

    public static deleteArticle(id: number) {
        let result: boolean = this.storage.deleteArticle(id);
        Display.printDeleteArticleMessage(result, id);
        
    }

    public static clearArticles(): void {
        let result: boolean = this.storage.clearArticles();
        Display.printClearAllMessage(result);
    }

    public static openAll(): void {
        const articles: Article[] = this.storage.getArticles();
        let question: any[] = [];
        if (articles.length < 1) {
            Display.printOpenAllErrorMessage();
        } else {
            articles.forEach(article => {
                const obj = {
                    name:
                        article.title +
                        " -> " +
                        colors.red(article.status)
                };
                question.push(obj);
            });
            inquirer
                .prompt([
                    {
                        type: "checkbox",
                        message: "Select Articles to open",
                        name: "articles",
                        choices: [...question],
                        validate: function(answer) {
                            if (answer.length < 1) {
                                return "You must choose at least one article.";
                            }
                            return true;
                        }
                    }
                ])
                .then(answers => {
                    const value = Object.values(answers);
                    const arrVal : string[] = Object.values(value[0]);
                    let titles: string[] = [];
                    arrVal.forEach(ar => {
                        titles.push(ar.split(" -> ")[0])
                    });
                    const art = articles.filter((article, i) => {
                        return titles.includes(article.title);
                    });
                    art.forEach(article => {
                        opn(article.url);
                    });
                });
        }
    }
}
