import React, { PureComponent } from 'react';
import CardEnum from '../models/card-enum';
import Card from './card';

export interface CardsWrapperProps {
    playMode: boolean
}
 
export interface CardsWrapperState {
    
}
 
class CardsWrapper extends PureComponent<CardsWrapperProps, CardsWrapperState> {
    render() { 
        const CARDS = CardEnum["Main Page"]
        return (  
            <div className = {"cardWrapper"}>
                {CARDS.map((card) => <Card key = {card.name} 
                                    playMode = {this.props.playMode}
                                    name = {card.name}
                                    img = {card.img}/>)}
            </div>
        );
    }
}
 
export default CardsWrapper;