import chalk from "chalk";

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
                    chalk`{bold.underline.red ${article.id.toString()} - ${
                        article.title
                    }}`
                );
                this.printTags(article.tags);
                console.info("\n");
            }
        } else if (mode === PresentationMode.ONE) {
            console.info(chalk`{bold.underline.red ${article.title}}`);

            if (article.description)
                console.info(chalk`{bold.white ${article.description}}`);

            this.printTags(article.tags);
        }
    }

    static printTags(tags?: string[]) {
        if (tags && tags.length > 0) {
            for (let tag of tags) {
                tag = " ".concat(tag).concat(" ");
                process.stdout.write(chalk`{bgWhite.bold.blue ${tag}} `);
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
}
