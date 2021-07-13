import express from "express";
import cors from "cors";
import DATA_BASE from "./db";

const APP = express();
const PORT = process.env.PORT || 8080;
APP.use(express.json({ limit: "50mb" }));

APP.use(cors({
  origin: ["http://localhost:3000", "https://rolling-scopes-school.github.io", "https://brave-joliot-7aafae.netlify.app"],
}));

APP.get("/:page?/:id?", (req, res) => {
  res.set("Content-Type", "application/json");
  if (req.params.page === undefined) {
    let RESULT = [];
    Object.keys(DATA_BASE).forEach((key) => {
      if (key === "pages" || key === "main_page" || key === "admin" || key === "length") return;
      RESULT = RESULT.concat(DATA_BASE[key]);
    });
    res.send(RESULT);
  } else {
    const RESULT = DATA_BASE[req.params.page];
    if (JSON.stringify(req.query) === "{}" && req.params.id === undefined) {
      res.send(RESULT);
    } else if (req.params.id !== undefined) {
      const ID = /^\d+$/.test(req.params.id) ? Number(req.params.id) : req.params.id;
      const ITEM = (RESULT as {id: number|string}[]).filter((item) => item.id === ID)[0];
      res.send(ITEM);
    } else {
      if (req.query.page !== undefined) {
        const ITEM = (RESULT as {page: string}[]).filter((item) => item.page === req.query.page)[0];
        res.send(ITEM);
      } else {
        const ITEM = (RESULT as {name: string}[]).filter((item) => item.name === req.query.name)[0];
        res.send(ITEM);
      }
    }
  }
});

APP.post("/:page", (req, res) => {
  if (req.params.page === "pages") {
    const PAGE_ID = req.body.name.toLocaleLowerCase().split(" ").join("_");
    const PAGE_ITEM = { page: req.body.name, id: PAGE_ID };
    const MAIN_PAGE_ITEM = {
      id: DATA_BASE.length + 1,
      name: req.body.name,
      img: req.body.img,
      transl: null,
      sound: null,
    };
    DATA_BASE.length += 1;
    DATA_BASE.pages.push(PAGE_ITEM);
    DATA_BASE.main_page.push(MAIN_PAGE_ITEM);
    DATA_BASE[PAGE_ID] = [];
  } else {
    const ITEM = {
      id: DATA_BASE.length + 1,
      name: req.body.name,
      transl: req.body.transl,
      img: req.body.img,
      sound: req.body.sound,
    };
    DATA_BASE.length += 1;
    DATA_BASE[req.params.page].push(ITEM);
  }
  res.sendStatus(200);
});

APP.put("/:page/:id", (req, res) => {
  const ID = /^\d+$/.test(req.params.id) ? Number(req.params.id) : req.params.id;
  const ITEM = (DATA_BASE[req.params.page] as {id: number|string, page: string}[])
    .filter((item) => item.id === ID)[0];
  if (req.params.page === "pages") {
    const MAIN_PAGE_ITEM = (DATA_BASE.main_page as {name: string}[])
      .filter((item) => item.name === ITEM.page)[0];
    MAIN_PAGE_ITEM.name = req.body.page;
  }
  Object.keys(ITEM).forEach((key) => {
    ITEM[key] = req.body[key];
  });
  res.sendStatus(200);
});

APP.delete("/:page/:id", (req, res) => {
  const ID = /^\d+$/.test(req.params.id) ? Number(req.params.id) : req.params.id;
  let wordId: number = null;
  for (let item = 0; item < DATA_BASE[req.params.page].length; item += 1) {
    if (DATA_BASE[req.params.page][item].id === ID) {
      wordId = item;
    }
  }
  if (req.params.page === "pages") {
    let mainPage: number = null;
    for (let item = 0; item < DATA_BASE.main_page.length; item += 1) {
      if (DATA_BASE.main_page[item].name === DATA_BASE.pages[wordId].page) {
        mainPage = item;
      }
    }
    const ID = DATA_BASE.pages[wordId].id;
    delete DATA_BASE[ID];
    DATA_BASE.main_page.splice(mainPage, 1);
  }
  DATA_BASE[req.params.page].splice(wordId, 1);
  res.sendStatus(200);
});

APP.listen(PORT, () => {
  console.log("Server is running at http://localhost:", PORT);
});
