import { getAllCards } from "../utils/fetch-funstions";

export async function createLocalStorage() {
  const CARDS = await getAllCards();
  CARDS.forEach((card) => {
    if (localStorage[`${card.name}`] === undefined) {
      localStorage.setItem(card.name, JSON.stringify({ trainClick: 0, correctClick: 0, wrongClick: 0 }));
    }
  });
}

export async function cleanLocalStorage() {
  const CARDS = await getAllCards();
  CARDS.forEach((card) => {
    localStorage.setItem(card.name, JSON.stringify({ trainClick: 0, correctClick: 0, wrongClick: 0 }));
  });
}
