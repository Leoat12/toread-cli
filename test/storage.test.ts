import { Storage } from "../src/storage";
import * as fs from "fs";
import { Status } from "../src/article";

afterEach(() => {
    fs.unlinkSync("file.json");
});

test("write", () => {
    let storage = new Storage();
    storage.saveArticle({
        title: "Teste",
        url: "http://www.example.com",
        description: "Description test",
        status: Status.ToRead
    });
    expect(fs.existsSync("file.json")).toBe(true);
});

test("updateAddingTags", () => {
    let storage = new Storage();
    let savedArticle = storage.saveArticle({
        title: "Teste",
        url: "http://www.example.com",
        description: "Description test",
        tags: ["Tag1", "Tag2"],
        status: Status.ToRead
    });

    if(savedArticle.tags) savedArticle.tags.push("Tag3");
    savedArticle.description = "Description test modified";

    if(savedArticle.id){
        let updatedArticle = storage.updateArticle(savedArticle.id, true, savedArticle.description, ["Tag3"]);
        if(updatedArticle){
            expect(storage.getArticles().filter(a => updatedArticle != undefined && a.id == updatedArticle.id).length).toBe(1);
            expect(updatedArticle.description).toBe("Description test modified");
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
        tags: ["Tag1", "Tag2"],
        status: Status.ToRead
    });

    savedArticle.description = "Description test modified";

    if(savedArticle.id){
        let updatedArticle = storage.updateArticle(savedArticle.id, false, savedArticle.description, ["Tag2"]);
        if(updatedArticle){
            expect(storage.getArticles().filter(a => updatedArticle != undefined && a.id == updatedArticle.id).length).toBe(1);
            expect(updatedArticle.description).toBe("Description test modified");
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
        description: "Description test",
        status: Status.ToRead
    });

    let articles = storage.getArticles();
    expect(articles.length).toBe(1);
});

test("getOne", () => {
    let storage = new Storage();
    storage.saveArticle({
        title: "Teste",
        url: "http://www.example.com",
        description: "Description test",
        status: Status.ToRead
    });

    let article = storage.getArticle(1);
    expect(article).toEqual({
        id: 1,
        title: "Teste",
        description: "Description test",
        url: "http://www.example.com",
        status: Status.ToRead
    });
});

test("delete", () => {
    let storage = new Storage();
    storage.saveArticle({
        title: "Teste",
        url: "http://www.example.com",
        description: "Description test",
        status: Status.ToRead
    });
    if (storage.deleteArticle(1)) {
        let articles = storage.getArticles();
        expect(articles.length).toBe(0);
    } else {
        fail("Article not deleted");
    }
});
