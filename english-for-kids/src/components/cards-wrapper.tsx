import React, { MouseEventHandler, PureComponent } from 'react';
import CardEnum from '../models/card-enum';
import Card from './card';
import * as Const from "../models/const"

export interface CardsWrapperProps {
    playMode: boolean,
    page: string,
    clickEvent: Function
}
 
export interface CardsWrapperState {
    game: boolean
}
 
class CardsWrapper extends PureComponent<CardsWrapperProps, CardsWrapperState> {
    state = {
        game : false,
    }

    render() { 
        const CARDS = CardEnum[this.props.page];
        console.log(this.state.game)
        return ( 
            <React.Fragment>
                <div className = {"cardWrapper"}>
                    {CARDS.map((card) => <Card key = {card.name} 
                                        playMode = {this.props.playMode}
                                        name = {card.name}
                                        img = {card.img}
                                        transl = {card.transl}
                                        audio = {card.sound}
                                        clickEvent = {!card.transl && this.props.clickEvent as MouseEventHandler}/>)}
                </div>
                {this.getPlayButton()}
            </React.Fragment> 
        );
    }

    private getPlayButton = () => {
        if (!this.props.playMode) return;
        if (this.state.game) return <button className = {"playButton__repeat"}></button>;
        return <button className = {"playButton__start"}>{Const.START}</button>;
    }


}
 
export default CardsWrapper;