import { Storage } from "../src/storage";
import * as fs from "fs";

afterEach(() => {
    fs.unlinkSync("file.json");
});

test("write", () => {
    let storage = new Storage();
    storage.saveArticle({
        title: "Teste",
        url: "http://www.example.com",
        description: "Description test"
    });
    expect(fs.existsSync("file.json")).toBe(true);
});

test("updateAddingTags", () => {
    let storage = new Storage();
    let savedArticle = storage.saveArticle({
        title: "Teste",
        url: "http://www.example.com",
        description: "Description test",
        tags: ["Tag1", "Tag2"]
    });

    if (savedArticle.tags) savedArticle.tags.push("Tag3");
    savedArticle.description = "Description test modified";

    if (savedArticle.id) {
        let updatedArticle = storage.updateArticle(
            savedArticle.id,
            true,
            savedArticle.description,
            ["Tag3"]
        );
        if (updatedArticle) {
            expect(updatedArticle.description).toBe(
                "Description test modified"
            );
            expect(updatedArticle.tags).toEqual(["Tag1", "Tag2", "Tag3"]);
        } else {
            fail("Updated Article is undefined.");
        }
    } else {
        fail("Article ID null");
    }
});

test("updateRemovingTags", () => {
    let storage = new Storage();
    let savedArticle = storage.saveArticle({
        title: "Teste",
        url: "http://www.example.com",
        description: "Description test",
        tags: ["Tag1", "Tag2"]
    });

    savedArticle.description = "Description test modified";

    if (savedArticle.id) {
        let updatedArticle = storage.updateArticle(
            savedArticle.id,
            false,
            savedArticle.description,
            ["Tag2"]
        );
        if (updatedArticle) {
            expect(updatedArticle.description).toBe(
                "Description test modified"
            );
            expect(updatedArticle.tags).toEqual(["Tag1"]);
        } else {
            fail("Updated Article is undefined.");
        }
    } else {
        fail("Article ID null");
    }
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
});

test("clearStorage", () => {
    let storage = new Storage();
    storage.clearArticles();
    if (!fs.existsSync("file.json")) {
        expect(fs.existsSync("file.json")).toBe(false);
    } else {
        fail("Article not deleted");
    }
});
