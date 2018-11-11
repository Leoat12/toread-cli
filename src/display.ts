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
                    colors.bold.underline.green(`#${article.id.toString()}`) +
                        colors.bold.underline.green(` ${article.title}`) +
                        colors.red(` -> ${article.status}`)
                );
                this.printTags(article.tags);
                console.info("\n");
            }
        } else if (mode === PresentationMode.ONE) {
            console.info(colors.bold.underline.red(article.title));

            if (article.description)
                console.info(colors.bold.white(article.description));

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
            console.info(colors.bold.white(`Article saved successfully!`));
        } else {
            console.error(
                colors.bold.red(
                    `An error occurred while getting article information: ${code}`
                )
            );
        }
    }

    static printDeleteArticleMessage(result: boolean, id: number) {
        if (result) {
            console.info(
                colors.bold.green(
                    `Article #${id.toString()} deleted successfully`
                )
            );
        } else {
            console.info(
                colors.bold.red(
                    `An error ocurred while deleting the article #${id.toString()}, verify if it exists.`
                )
            );
        }
    }

    static printClearAllMessage(result: boolean) {
        if (result) {
            console.info(colors.bold.green(`All Articles are deleted.`));
        } else {
            console.info(
                colors.bold.red(`An error ocurred while removing all articles.`)
            );
        }
    }

    static printOpenErrorMessage() {
        let message =
            "The article was not found. Verify the ID of the article.";
        console.info(colors.bold.red(message));
    }

    static printUpdateErrorMessage(id: number) {
        let message = `The article with ID ${id} could not be updated. Verify the ID and the command.`;
        console.info(colors.bold.red(message));
    }

    static printGetArticlesErrorMessage() {
        console.info("%s", colors.red(`There's no article you saved.`));
    }

    static printOpenAllErrorMessage() {
        console.log("%s", colors.red("You don't have articles to open."));
    }
}
