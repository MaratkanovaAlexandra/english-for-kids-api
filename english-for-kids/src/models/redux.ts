import CardEnum from '../models/card-enum';
import * as Const from "./const";

const Redux = {
    state: {
        playMode: false,
        menuMode: false,
        game: false,
        page: Const.MAIN_PAGE,
        cards: CardEnum[Const.MAIN_PAGE],
        cardPlaing: null,
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
                console.log(page)
                this.state.cards = CardEnum[page as string];
                this.state.page = page as string;
                break; 
        }
        return this.state;
    }
}

export default Redux;