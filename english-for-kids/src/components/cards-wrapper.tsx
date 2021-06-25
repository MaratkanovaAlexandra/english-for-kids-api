import React, { MouseEventHandler, PureComponent } from 'react';
import Card from './card';
import * as Const from "../models/const";
import Redux from './../models/redux';

export interface CardsWrapperProps {
    play: boolean,
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
        console.log(2);
        return ( 
            <React.Fragment>
                <div className = {"cardWrapper"}>
                    {Redux.state.cards.map((card) => <Card key = {card.name} 
                                        play = {Redux.state.playMode}
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
        if (!Redux.state.playMode) return;
        if (this.state.game) return <button className = {"playButton__repeat"}></button>;
        return <button className = {"playButton__start"}>{Const.START}</button>;
    }
}
 
export default CardsWrapper;