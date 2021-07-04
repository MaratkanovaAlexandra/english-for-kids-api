import express from 'express';
import DATA_BASE from './db';

const APP = express();
const PORT = 3000;
APP.use(express.json());
APP.set('Content-Type', "application/json");

APP.get('/:page/:id?', (req, res) => {
  const RESULT = DATA_BASE[req.params.page];
  if (JSON.stringify(req.query) === "{}" && req.params.id === undefined) {
    res.send(RESULT);
  } else if (req.params.id !== undefined) {
    const ID = /^\d+$/.test(req.params.id) ? Number(req.params.id) :  req.params.id;
    const ITEM = (RESULT as {id: number|string}[]).filter(item => item.id === ID)[0];
    res.send(ITEM);
  } else {
    const ITEM = (RESULT as {page: string}[]).filter(item => item.page === req.query.page)[0];
    res.send(ITEM);
  }
});

APP.post('/:page', (req, res) => {
  if (req.params.page === "pages") {
    const PAGE_ID = req.body.name.toLocaleLowerCase().split(" ").join("_");
    const PAGE_ITEM = {page: req.body.name, id: PAGE_ID};
    const MAIN_PAGE_ITEM = {id: DATA_BASE.main_page.length+1, name: req.body.name, img:  req.body.img, transl: null, sound: null};
    DATA_BASE.pages.push(PAGE_ITEM);
    DATA_BASE.main_page.push(MAIN_PAGE_ITEM);
    DATA_BASE[PAGE_ID] = {};
  } else {
    const ITEM = {id: DATA_BASE[req.params.page].length+1, 
                  name: req.body.name, 
                  transl: req.body.transl, 
                  img: req.body.img, 
                  sound: req.body.sound};
    DATA_BASE[req.params.page].push(ITEM);
    console.log(DATA_BASE[req.params.page]);
  }
  res.sendStatus(200);
});

APP.put('/:page/:id', (req, res) => {
  const ID = /^\d+$/.test(req.params.id) ? Number(req.params.id) :  req.params.id;
  let ITEM = (DATA_BASE[req.params.page] as {id: number|string, page: string}[]).filter(item => item.id === ID)[0];
  if (req.params.page === "pages") {
    const MAIN_PAGE_ITEM =  (DATA_BASE.main_page as {name: string}[]).filter(item => item.name ===  ITEM.page)[0];
    MAIN_PAGE_ITEM.name = req.body.page;
  }
  Object.keys(ITEM).forEach(key => {
    ITEM[key] = req.body[key];
  });
  res.sendStatus(200);
});

APP.delete('/:page/:id', (req, res) => {

});

APP.listen(PORT, () => {
  console.log(`Server is running at http://localhost:`, PORT)
})
