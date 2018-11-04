import { Storage } from "../src/storage";
import * as fs from "fs";

test("write", () => {
    let storage = new Storage();
    storage.saveArticle({
        title: "Teste",
        url: "http://www.example.com",
        description: "Description test"
    });
    expect(fs.existsSync("file.json")).toBe(true);
    fs.unlinkSync("file.json");
});

test("getAll", () => {
    let storage = new Storage();
    storage.saveArticle({
        title: "Teste",
        url: "http://www.example.com",
        description: "Description test"
    });

    let articles = storage.getArticles();
    expect(articles.length).toBe(1);
    fs.unlinkSync("file.json");
});

test("getOne", () => {
    let storage = new Storage();
    storage.saveArticle({
        title: "Teste",
        url: "http://www.example.com",
        description: "Description test"
    });

    let article = storage.getArticle(1);
    expect(article).toEqual({
        id: 1,
        title: "Teste",
        description: "Description test",
        url: "http://www.example.com"
    });
    fs.unlinkSync("file.json");
});

test("delete", () => {
    let storage = new Storage();
    storage.saveArticle({
        title: "Teste",
        url: "http://www.example.com",
        description: "Description test"
    });
    if (storage.deleteArticle(1)) {
        let articles = storage.getArticles();
        expect(articles.length).toBe(0);
    } else {
        fail("Article not deleted");
    }
    fs.unlinkSync("file.json");
});
