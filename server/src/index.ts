import express from 'express';
import DATA_BASE from './db';

const app = express()
const port = 3000

app.get('/:page/:id?', (req, res) => {
  const RESULT = DATA_BASE[req.params.page];
  if (JSON.stringify(req.query) === "{}" && req.params.id === undefined) {
    res.send(RESULT);
  }
  if (req.params.id !== undefined) {
    const ID = /^\d+$/.test(req.params.id) ? Number(req.params.id) :  req.params.id;
    const ITEM = (RESULT as {id: number|string}[]).filter(item => item.id === ID)[0];
    res.send(ITEM);
  }
  console.log(req.query)
  const ITEM = (RESULT as {page: string}[]).filter(item => item.page === req.query.page)[0];
  res.send(ITEM);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:`, port)
})
