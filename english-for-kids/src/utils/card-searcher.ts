import PlayCard from "../types/card";
import { getAllCards } from "../utils/fetch-funstions";

async function findCard(name: string) {
  const CARDS = await getAllCards();
  for (let card = 0; card < CARDS.length; card++) {
    if(CARDS[card].name === name) {
      return CARDS[card];
    } 
  }
}

async function findRepeatCards() {
  let resutl: { name: string; wrong: number }[] = [];
    Object.keys(localStorage).forEach((key) => {
      if (typeof localStorage[key] !== "string" || !localStorage[key].includes("wrongClick")) return;
      const STATS = JSON.parse(localStorage[key]);
      if (STATS.wrongClick !== 0) {
        resutl.push({ name: key, wrong: STATS.wrongClick });
      }
    });
    resutl.sort((a, b) => {
      if (a.wrong > b.wrong) {
        return -1;
      }
      if (a.wrong < b.wrong) {
        return 1;
      }
      return 0;
    });
    resutl = resutl.splice(0, 8);
    const CARDS: PlayCard[] = [];
    for (let i = 0; i < resutl.length; i++) {
      CARDS.push(await findCard(resutl[i].name) as PlayCard)
    }    
    return CARDS;
}

export default findRepeatCards;
