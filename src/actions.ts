import { RxHR } from "@akanass/rx-http-request";
import inquirer from "inquirer";
import { JSDOM } from "jsdom";
import colors from "colors";
import opn from "opn";

import { Article, Status } from "./article";
import { Storage } from "./storage";
import { Display, PresentationMode } from "./display";

export class Actions {
    static storage: Storage = new Storage();

    static getArticles(): void {
        let articles: Article[] = this.storage.getArticles();
        if (articles.length < 1) {
            Display.printGetArticlesErrorMessage();
        } else {
            articles.forEach(a => {
                Display.printArticle(a, PresentationMode.LIST);
            });
        }
    }

    static openArticle(id: number): void {
        let article = this.storage.getArticle(id);
        if (article) opn(article.url);
        else Display.printOpenErrorMessage();
    }

    static saveArticle(url: string, description: string, tags?: string): void {
        RxHR.get(url).subscribe(
            (data: any) => {
                if (data.response.statusCode === 200) {
                    let window = new JSDOM(data.body).window;
                    let title = window.document.title;
                    let article: Article = {
                        title: title,
                        url: url,
                        description: description,
                        tags: tags ? tags.split(",") : [],
                        status: Status.ToRead
                    };

                    Actions.storage.saveArticle(article);

                    Display.printSaveArticleMessage(data.response.statusCode);
                    Display.printArticle(article, PresentationMode.ONE);
                } else {
                    Display.printSaveArticleMessage(data.response.statusCode);
                }
            },
            (err: any) => console.error(err) // Show error in console
        );
    }

    static updateArticle(id: number, addTags: boolean, description?: string, tags?: string, status?: Status): void{
        
        let tagsArray = tags ? tags.split(",") : undefined;
        let updatedArticle = this.storage.updateArticle(id, addTags, description, tagsArray, status);

        if(updatedArticle){
            Display.printArticle(updatedArticle, PresentationMode.ONE);
        } else {
            Display.printUpdateErrorMessage(id);
        }
    }

    static deleteArticle(id: number) {
        let result: boolean = this.storage.deleteArticle(id);
        Display.printDeleteArticleMessage(result, id);
        
    }

    static clearArticles(): void {
        let result: boolean = this.storage.clearArticles();
        Display.printClearAllMessage(result);
    }

    static openAll(): void {
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
