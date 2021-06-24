import React, { MouseEventHandler, PureComponent } from 'react';
import CardEnum from '../models/card-enum';
import Card from './card';

export interface CardsWrapperProps {
    playMode: boolean,
    page: string,
    clickEvent: Function
}
 
export interface CardsWrapperState {
    
}
 
class CardsWrapper extends PureComponent<CardsWrapperProps, CardsWrapperState> {
    render() { 
        const CARDS = CardEnum[this.props.page];
        return (  
            <div className = {"cardWrapper"}>
                {CARDS.map((card) => <Card key = {card.name} 
                                    playMode = {this.props.playMode}
                                    name = {card.name}
                                    img = {card.img}
                                    transl = {card.transl}
                                    audio = {card.sound}
                                    clickEvent = {!card.transl && this.props.clickEvent as MouseEventHandler}/>)}
            </div>
        );
    }

    // click = () => {
    //     const audio = new Audio();
    //     audio.src = CardEnum["Emotion"][1].sound as string;
    //     audio.currentTime = 0;
    //     audio.play()
    // }
}
 
export default CardsWrapper;