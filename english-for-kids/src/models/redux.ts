import CardEnum from '../models/card-enum';
import * as Const from "./const";
import playAudio from '../utils/audio';
import * as Sound from "./sound-effects"

let id = 1;
const Redux = {
    state: {
        playMode: false,
        menuMode: false,
        game: false,
        page: Const.MAIN_PAGE,
        cards: CardEnum[Const.MAIN_PAGE],
        PlayCards: [],
        cardPlaing: {name: "", img: "", transl: "", sound: ""},
        correctCards: [],
        answers: [],
        complImage: ""
    },

    getState: function() {
        return this.state;
    },

    setState: function(type: string, input? :string) {
        switch(type) {
            case "changePlayMode" : 
                this.state.playMode = ! this.state.playMode;
                this.resetPage();
                break;
            case "changeMenuMode" : 
                this.state.menuMode = ! this.state.menuMode;
                break;
            case "changePage" : 
                this.state.cards = CardEnum[input as string];
                this.state.page = input as string;
                this.resetPage();
                break; 
            case "changeGameMode" :
                this.state.game = !this.state.game;
                this.state.PlayCards = [...this.state.cards] as never;
                this.getNewCardPlaing();
                break;
            case "changeCard" :
               this.changeCardReduser(input as string);
        }
        return this.state;
    },

    getNewCardPlaing: function() {
        this.state.cardPlaing = this.state.PlayCards[Math.floor(Math.random() * this.state.PlayCards.length)];
        this.state.PlayCards.splice(this.state.PlayCards.indexOf(this.state.cardPlaing as never),1)
        playAudio(this.state.cardPlaing.sound);
    },

    reset: function() {
        if (this.state.answers.length === 8) {
            this.state.complImage = "win";
            console.log("win");
        } else {
            this.state.complImage = "lose";
            console.log("lose");
        }

        this.state.menuMode = false;
        this.state.game = false;
        this.state.page = Const.MAIN_PAGE;
        this.state.cards = CardEnum[Const.MAIN_PAGE];
        this.state.PlayCards = [];
        this.state.cardPlaing = {name: "", img: "", transl: "", sound: ""};
        this.state.correctCards = [];
        this.state.answers = [];
    },

    resetPage : function() {
        this.state.game = false;
        this.state.PlayCards = [];
        this.state.cardPlaing = {name: "", img: "", transl: "", sound: ""};
        this.state.correctCards = [];
        this.state.answers = [];
    },

    showImage: function() {
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
        }, 3000)
    },

    changeCardReduser: function(input: string) {
        if (this.state.cardPlaing.name === input) {
            this.state.answers = [...this.state.answers, {id: id+=1, correct: true} as never];
            this.state.correctCards = [...this.state.correctCards, this.state.cardPlaing.name as never];
            playAudio(Sound.correct);
            const STATS = JSON.parse(localStorage[`${input}`]);
            STATS.correctClick += 1;
            localStorage.setItem(`${input}`, JSON.stringify(STATS));
            if (this.state.PlayCards.length === 0) {
                this.reset();
                this.showImage();
                return;
            };
            setTimeout(() => this.getNewCardPlaing(),1000);
        } else {        
            this.state.answers = [...this.state.answers, {id: id+=1, correct: false} as never];
            playAudio(Sound.error);
            const STATS = JSON.parse(localStorage[`${input}`]);
            STATS.wrongClick += 1;
            localStorage.setItem(`${input}`, JSON.stringify(STATS));
        }
        console.log(JSON.parse(localStorage[`${input}`]));
    }
}

export default Redux;

