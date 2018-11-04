#!/usr/bin/env node

import Commander, {Command} from "commander";
import {Actions} from "./actions";

Commander
    .version('1.0.0')
    .description('To Read Project CLI');

Commander
    .command('list')
    .alias('ls')
    .description('List all articles')
    .action(() => {
        Actions.getArticles();
    });

Commander
    .command('open <id>')
    .alias('o')
    .description('Open the article in the default browser.')
    .action((id:number) => {
        Actions.openArticle(id);
    });

Commander
    .command('saveArticle <url>')
    .alias('sa')
    .option('-i, --information <info>', 'Subject of the article')
    .option('-t, --tags <tags>', 'Tags separated by comma')
    .description('Saves an article.')
    .action((url:string, cmd:Command) => {
        let description:string = cmd.opts()['information'];
        let tags:string = cmd.opts()['tags'];
        Actions.saveArticle(url, description, tags);
    });

Commander
    .command('deleteArticle <id>')
    .alias('da')
    .description('Delete the article with the given ID')
    .action((id:number) => {
        Actions.deleteArticle(id);
    });

Commander.parse(process.argv);
