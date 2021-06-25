import React, { MouseEventHandler, PureComponent } from 'react';
import Card from './card';
import * as Const from "../models/const";
import Redux from './../models/redux';
import playAudio from '../utils/audio';

export interface CardsWrapperProps {
    play: boolean,
    page: string,
    clickEvent: Function
}
 
export interface CardsWrapperState {
    game: boolean
}
 
class CardsWrapper extends PureComponent<CardsWrapperProps, CardsWrapperState> {
    render() { 
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
        if (Redux.state.game) return <button className = {"playButton__repeat"} onClick={this.playButtonClick}></button>;
        return <button className = {"playButton__start"} onClick={this.playButtonClick}>{Const.START}</button>;
    }

    private playButtonClick = () => {
        if (Redux.state.page === Const.MAIN_PAGE) return;
        if (!Redux.state.game) {
            this.setState(Redux.setState("changeGameMode"));
            return;
        }
        playAudio(Redux.state.cardPlaing.sound)
    }
}
 
export default CardsWrapper;