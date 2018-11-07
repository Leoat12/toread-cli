import chalk from "chalk";
import colors from "colors";

import { Article } from "./article";

export enum PresentationMode {
    LIST,
    ONE
}

export class Display {
    static printArticle(article: Article, mode: PresentationMode) {
        if (mode === PresentationMode.LIST) {
            if (article.id) {
                console.info(
                    chalk`{bold.underline.green ${article.id.toString()}#} ` +
                        chalk`{bold.underline.green ${article.title}}` +
                        colors.grey(" -> " + article.url)
                );
                this.printTags(article.tags);
                console.info("\n");
            }
        } else if (mode === PresentationMode.ONE) {
            console.info(chalk`{bold.underline.red ${article.title}}`);

            if (article.description)
                console.info(chalk`{bold.white ${article.description}}`);

            this.printTags(article.tags);
            console.info("\n");
        }
    }

    static printTags(tags?: string[]) {
        if (tags && tags.length > 0) {
            for (let tag of tags) {
                tag = "[".concat(tag).concat("]");
                process.stdout.write(`${colors.green(tag)}`);
            }

            process.stdout.write(`\n`);
        }
    }

    static printSaveArticleMessage(code: number) {
        if (code === 200) {
            console.info(chalk`Article saved successfully!`);
        } else {
            console.error(
                `An error occurred while getting article information: ${code}`
            );
        }
    }

    static printOpenErrorMessage() {
        let message =
            "The article was not found. Verify the ID of the article.";
        console.info(chalk`{red.bold ${message}}`);
    }

    static printUpdateErrorMessage(id: number){
        let message = "The article could not be updated. Verify the ID and the command.";
        console.info(chalk`{red.bold ${message}}`);
    }
}
