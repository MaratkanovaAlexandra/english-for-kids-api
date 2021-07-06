import CardEnum from "../models/card-enum";
import PlayCard from "../types/card";
import * as Const from "./const";
import playAudio from "../utils/audio";
import * as Sound from "./sound-effects";
import findCard from "../utils/card-searcher";

let id = 1;
const Redux = {
  state: {
    playMode: false,
    menuMode: false,
    game: false,
    page: Const.MAIN_PAGE,
    PlayCards: [],
    cardPlaing: { name: "", img: "", transl: "", sound: "" },
    correctCards: [],
    answers: [],
    complImage: "",
    repeat: [] as { name: string; wrong: number }[]
  },

  getState() {
    return this.state;
  },

  setState(
    type: string,
    input?: string | { name: string; wrong: number }[] | PlayCard[],
  ) {
    switch (type) {
      case "changePlayMode":
        this.state.playMode = !this.state.playMode;
        this.resetPage();
        break;
      case "changeMenuMode":
        this.state.menuMode = !this.state.menuMode;
        break;
      case "changePage":
        this.state.page = input as string;
        this.resetPage();
        break;
      case "changeGameMode":
        this.state.game = !this.state.game;
        this.state.PlayCards = [...(input as PlayCard[])] as never;
        this.getNewCardPlaing();
        break;
      case "changeCard":
        this.changeCardReduser(input as string);
        break;
      case "repeatWords":
        this.repeatWorrds(input as { name: string; wrong: number }[]);
        break;
      default:
    }
    return this.state;
  },

  getNewCardPlaing() {
    this.state.cardPlaing = this.state.PlayCards[
      Math.floor(Math.random() * this.state.PlayCards.length)
    ];
    this.state.PlayCards.splice(this.state.PlayCards.indexOf(this.state.cardPlaing as never), 1);
    playAudio(this.state.cardPlaing.sound);
  },

  reset() {
    const CORRECT = this.state.answers
      .filter((point) => !(point as { id: number; correct: boolean }).correct);
    if (CORRECT.length === 0) {
      this.state.complImage = "win";
    } else {
      this.state.complImage = "lose";
    }

    this.state.menuMode = false;
    this.state.game = false;
    this.state.page = Const.MAIN_PAGE;
    this.state.PlayCards = [];
    this.state.cardPlaing = { name: "", img: "", transl: "", sound: "" };
    this.state.correctCards = [];
    this.state.answers = [];
  },

  resetPage() {
    this.state.game = false;
    this.state.PlayCards = [];
    this.state.cardPlaing = { name: "", img: "", transl: "", sound: "" };
    this.state.correctCards = [];
    this.state.answers = [];
  },

  showImage() {
    const IMAGE = document.querySelector(".complImage") as HTMLElement;
    if (this.state.complImage === "win") {
      playAudio(Sound.success);
      IMAGE.classList.add("win");
    } else {
      IMAGE.classList.add("lose");
      playAudio(Sound.failure);
    }

    IMAGE.style.display = "block";
    setTimeout(() => {
      IMAGE.style.display = "none";
      IMAGE.classList.remove("win");
      IMAGE.classList.remove("lose");
    }, 3000);
  },

  changeCardReduser(input: string) {
    if (this.state.cardPlaing.name === input) {
      this.state.answers = [
        ...this.state.answers,
        { id: (id += 1), correct: true } as never,
      ];
      this.state.correctCards = [
        ...this.state.correctCards,
        this.state.cardPlaing.name as never,
      ];
      playAudio(Sound.correct);
      const STATS = JSON.parse(localStorage[`${input}`]);
      STATS.correctClick += 1;
      localStorage.setItem(`${input}`, JSON.stringify(STATS));
      if (this.state.PlayCards.length === 0) {
        this.reset();
        this.showImage();
        return;
      }
      setTimeout(() => this.getNewCardPlaing(), 1000);
    } else {
      this.state.answers = [
        ...this.state.answers,
        { id: (id += 1), correct: false } as never,
      ];
      playAudio(Sound.error);
      const STATS = JSON.parse(localStorage[`${input}`]);
      STATS.wrongClick += 1;
      localStorage.setItem(`${input}`, JSON.stringify(STATS));
    }
  },

  repeatWorrds(input: { name: string; wrong: number }[]) {
    this.state.page = "repeat";
    this.resetPage();
  },
};

export default Redux;
