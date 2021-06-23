import React, { PureComponent } from 'react';
import CardEnum from '../models/card-enum';
import Card from './card';

export interface CardsWrapperProps {
    playMode: boolean,
    page: string
}
 
export interface CardsWrapperState {
    
}
 
class CardsWrapper extends PureComponent<CardsWrapperProps, CardsWrapperState> {
    render() { 
        const CARDS = CardEnum[this.props.page]
        return (  
            <div className = {"cardWrapper"}>
                {CARDS.map((card) => <Card key = {card.name} 
                                    playMode = {this.props.playMode}
                                    name = {card.name}
                                    img = {card.img}
                                    transl = {card.transl}/>)}
            </div>
        );
    }
}
 
export default CardsWrapper;