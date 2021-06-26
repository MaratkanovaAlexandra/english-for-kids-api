import CardEnum from '../models/card-enum';
import * as Const from "./const";
import playAudio from '../utils/audio';
import { CONNREFUSED } from 'dns';

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
        answers: []
    },

    getState: function() {
        return this.state;
    },

    setState: function(type: string, input? :string) {
        switch(type) {
            case "changePlayMode" : 
                this.state.playMode = ! this.state.playMode;
                break;
            case "changeMenuMode" : 
                this.state.menuMode = ! this.state.menuMode;
                break;
            case "changePage" : 
                this.state.cards = CardEnum[input as string];
                this.state.page = input as string;
                break; 
            case "changeGameMode" :
                this.state.game = !this.state.game;
                this.state.PlayCards = [...this.state.cards] as never;
                this.state.cardPlaing = this.state.PlayCards[Math.floor(Math.random() * this.state.PlayCards.length)];
                this.state.PlayCards.splice(this.state.PlayCards.indexOf(this.state.cardPlaing as never),1)
                playAudio(this.state.cardPlaing.sound);
                break;
            case "changeCard" :
                if (this.state.cardPlaing.name === input as string) {
                    this.state.answers = [...this.state.answers, {name: input as string, correct: true} as never];

                } else {        
                    this.state.answers = [...this.state.answers, {name: input as string, correct: true} as never];
                }

        }
        console.log(this.state)
        return this.state;
    }
}

export default Redux;