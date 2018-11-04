import { RxHR } from "@akanass/rx-http-request";
import { JSDOM } from "jsdom";
import chalk from "chalk";
import opn from "opn";

import { Article } from "./article";
import { Storage } from "./storage";
import { Display, PresentationMode } from "./display";

export class Actions {
    static storage: Storage = new Storage();

    static getArticles(): void {
        let articles: Article[] = this.storage.getArticles();
        articles.forEach(a => {
            Display.printArticle(a, PresentationMode.LIST);
        });
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
                        tags: tags ? tags.split(",") : []
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

    static updateArticle(id: number, addTags: boolean, description?: string, tags?: string): void{
        
        let tagsArray = tags ? tags.split(",") : undefined;
        let updatedArticle = this.storage.updateArticle(id, addTags, description, tagsArray);

        if(updatedArticle){
            Display.printArticle(updatedArticle, PresentationMode.ONE);
        } else {
            Display.printUpdateErrorMessage(id);
        }
    }

    static deleteArticle(id: number) {
        let result: boolean = this.storage.deleteArticle(id);
        if (result) {
            console.info(
                chalk`{bold.green Article with ID ${id.toString()} deleted successfully}`
            );
        } else {
            console.info(
                chalk`{bold.red An error ocurred while deleting the article, verify if it exists.}`
            );
        }
    }
}
