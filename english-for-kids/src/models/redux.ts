import CardEnum from '../models/card-enum';
import * as Const from "./const";
import playAudio from '../utils/audio';

const Redux = {
    state: {
        playMode: false,
        menuMode: false,
        game: false,
        page: Const.MAIN_PAGE,
        cards: CardEnum[Const.MAIN_PAGE],
        PlayCards: [],
        cardPlaing: {name: "", img: "", transl: "", sound: ""},
        answers: []
    },

    getState: function() {
        return this.state;
    },

    setState: function(type: string, page? :string) {
        switch(type) {
            case "changePlayMode" : 
                this.state.playMode = ! this.state.playMode;
                break;
            case "changeMenuMode" : 
                this.state.menuMode = ! this.state.menuMode;
                break;
            case "changePage" : 
                this.state.cards = CardEnum[page as string];
                this.state.page = page as string;
                break; 
            case "changeGameMode" :
                this.state.game = !this.state.game;
                this.state.PlayCards = [...this.state.cards] as never;
                this.state.cardPlaing = this.state.PlayCards[Math.floor(Math.random() * this.state.PlayCards.length)];
                playAudio(this.state.cardPlaing.sound);
                break;
        }
        console.log(this.state)
        return this.state;
    }
}

export default Redux;