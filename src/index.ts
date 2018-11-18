#!/usr/bin/env node

import Commander, {Command} from "commander";
import {Actions} from "./actions";
import {Status} from "./article";

Commander.version("1.0.0").description("To Read Project CLI");

Commander.command("list")
  .alias("ls")
  .description("List all articles")
  .action(() => {
    Actions.getArticles();
  });

Commander.command("searchTag <tag>")
    .alias("st")
    .description("Search articles by the tag given")
    .action((tag: string) => {
       Actions.getArticlesByTag(tag);
    });

Commander.command("open <id>")
  .alias("o")
  .description("Open the article in the default browser.")
  .action((id: number) => {
    Actions.openArticle(id);
  });

Commander.command("saveArticle <url>")
  .alias("sa")
  .option("-i, --information <info>", "Description of the article.")
  .option("-t, --tags <tags>", "Tags separated by comma.")
  .description("Saves an article.")
  .action((url: string, cmd: Command) => {
    const description: string = cmd.opts()["information"];
    const tags: string = cmd.opts()["tags"];
    Actions.saveArticle(url, description, tags);
  });

Commander.command("updateArticle <id>")
  .alias("ua")
  .option("-i, --information <info>", "Description of the article.")
  .option("-t, --tags <tags>", "Tags separated by comma.")
  .option(
    "-a, --addTags <addTags>",
    "Whether or not the tags given will be deleted (false) or added (true)",
  )
  .option(
    "-s, --status <status>",
    "The status of article: 'TO READ', 'READING' or 'READ'",
  )
  .description(
    "Update an article's information. Only description, tags and status can be changed.",
  )
  .action((id: number, cmd: Command) => {
    const description: string = cmd.opts()["information"];
    const tags: string = cmd.opts()["tags"];
    const addTags: boolean = cmd.opts()["addTags"] === "true";
    const status: Status = cmd.opts()["status"];
    Actions.updateArticle(id, addTags, description, tags, status);
  });

Commander.command("deleteArticle <id>")
  .alias("da")
  .description("Delete the article with the given ID")
  .action((id: number) => {
    Actions.deleteArticle(id);
  });

Commander.command("clearStorage")
  .alias("cla")
  .description("Delete all articles")
  .action(() => {
    Actions.clearArticles();
  });

Commander.command("opens")
  .alias("ops")
  .description("Open the selected article in the default browser.")
  .action(() => {
    Actions.openAll();
  });

Commander.command("delete")
  .alias("dlt")
  .description("Delete the selected article.")
  .action(() => {
    Actions.deleteAll();
  });

Commander.parse(process.argv);
