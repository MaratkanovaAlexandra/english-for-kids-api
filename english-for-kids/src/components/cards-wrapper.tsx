import React, { MouseEventHandler, PureComponent } from 'react';
import Card from './card';
import * as Const from "../models/const";
import Redux from './../models/redux';
import playAudio from '../utils/audio';

export interface CardsWrapperProps {
    play: boolean,
    page: string,
    clickEvent: Function,
}
 
export interface CardsWrapperState {
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
                                        clickEvent = {!card.transl && this.props.clickEvent as MouseEventHandler}
                                        cardClick = {this.cardClick}
                                        correct = {Redux.state.correctCards}
                                        />)}
                </div>
                <div className = {"answers"}>
                    {Redux.state.answers.map((star) => this.getPoint(star))}
                </div>
                {this.getPlayButton()}
                <div className = {"complImage"}></div>
            </React.Fragment> 
        );
    }

    private getPlayButton = () => {
        if (!Redux.state.playMode) return;
        if (Redux.state.game) return <button className = {"playButton__repeat"} onClick={this.playButtonClick}></button>;
        return <button className = {"playButton__start"} onClick={this.playButtonClick}>{Const.START}</button>;
    }

    private getPoint = (point: {id: number, correct: boolean}) => {
        if (point.correct) return <div key = {point.id} className = {"star fill"}></div>;
        return <div key = {point.id} className = {"star no-fill"}></div>;
    }

    private playButtonClick = () => {
        if (Redux.state.page === Const.MAIN_PAGE) return;
        if (!Redux.state.game) {
            this.setState(Redux.setState("changeGameMode"));
            return;
        }
        playAudio(Redux.state.cardPlaing.sound);
    }

    
    private cardClick = (name: string, audio: string) => {
        if (Redux.state.playMode) {
            this.setState(Redux.setState("changeCard",name));
            return;
        }
        playAudio(audio);
        const STATS =  JSON.parse(localStorage[`${name}`]);
        STATS.trainClick += 1;
        localStorage.setItem(`${name}`, JSON.stringify(STATS));
    }
}
 
export default CardsWrapper;