import * as fs from "fs";
import { Status } from "../src/article";
import { Storage } from "../src/storage";

afterEach(() => {
    fs.unlinkSync("file.json");
});

test("write", () => {
    const storage = new Storage();
    storage.saveArticle({
        title: "Test",
        url: "http://www.example.com",
        description: "Description test",
        status: Status.ToRead,
    });
    expect(fs.existsSync("file.json")).toBe(true);
});

test("updateAddingTags", () => {
    const storage = new Storage();
    const savedArticle = storage.saveArticle({
        title: "Test",
        url: "http://www.example.com",
        description: "Description test",
        tags: ["Tag1", "Tag2"],
        status: Status.ToRead,
    });

    if (savedArticle.tags) {
        savedArticle.tags.push("Tag3");
    }
    savedArticle.description = "Description test modified";

    if (savedArticle.id) {
        const updatedArticle = storage.updateArticle(
            savedArticle.id,
            true,
            savedArticle.description,
            ["Tag3"],
        );
        if (updatedArticle) {
            expect(
                storage
                    .getArticles()
                    .filter(
                        (a) =>
                            updatedArticle != undefined &&
                            a.id == updatedArticle.id,
                    ).length,
            ).toBe(1);
            expect(updatedArticle.description).toBe(
                "Description test modified",
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
    const storage = new Storage();
    const savedArticle = storage.saveArticle({
        title: "Test",
        url: "http://www.example.com",
        description: "Description test",
        tags: ["Tag1", "Tag2"],
        status: Status.ToRead,
    });

    savedArticle.description = "Description test modified";

    if (savedArticle.id) {
        const updatedArticle = storage.updateArticle(
            savedArticle.id,
            false,
            savedArticle.description,
            ["Tag2"],
        );
        if (updatedArticle) {
            expect(
                storage
                    .getArticles()
                    .filter(
                        (a) =>
                            updatedArticle != undefined &&
                            a.id == updatedArticle.id,
                    ).length,
            ).toBe(1);
            expect(updatedArticle.description).toBe(
                "Description test modified",
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
    const storage = new Storage();
    storage.saveArticle({
        title: "Test",
        url: "http://www.example.com",
        description: "Description test",
        status: Status.ToRead,
    });

    const articles = storage.getArticles();
    expect(articles.length).toBe(1);
});

test("getOne", () => {
    const storage = new Storage();
    storage.saveArticle({
        title: "Test",
        url: "http://www.example.com",
        description: "Description test",
        status: Status.ToRead,
    });

    const article = storage.getArticle(1);
    expect(article).toEqual({
        id: 1,
        title: "Test",
        description: "Description test",
        url: "http://www.example.com",
        status: Status.ToRead,
    });
});

test("delete", () => {
    const storage = new Storage();
    storage.saveArticle({
        title: "Test",
        url: "http://www.example.com",
        description: "Description test",
        status: Status.ToRead,
    });
    if (storage.deleteArticle(1)) {
        const articles = storage.getArticles();
        expect(articles.length).toBe(0);
    } else {
        fail("Article not deleted");
    }
});

test("clearStorage", () => {
    const storage = new Storage();
    storage.clearArticles();
    if (!fs.existsSync("file.json")) {
        expect(fs.existsSync("file.json")).toBe(false);
    } else {
        fail("Storage not deleted");
    }
});
