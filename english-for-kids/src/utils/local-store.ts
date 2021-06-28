import CardEnum from '../models/card-enum';
import * as Const from '../models/const';

export function createLocalStorage() {
  for (const key in CardEnum) {
    if (key !== Const.MAIN_PAGE)
      CardEnum[key].forEach((card) => {
        if (localStorage[`${card.name}`] === undefined) {
          localStorage.setItem(card.name, JSON.stringify({ trainClick: 0, correctClick: 0, wrongClick: 0 }));
        }
      });
  }
}

export function cleanLocalStorage() {
  for (const key in CardEnum) {
    if (key !== Const.MAIN_PAGE) {
      CardEnum[key].forEach((card) => {
        localStorage.setItem(card.name,
          JSON.stringify({ trainClick: 0, correctClick: 0, wrongClick: 0 }));
      });
    }
  }
}
