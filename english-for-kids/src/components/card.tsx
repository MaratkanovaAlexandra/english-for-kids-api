import React, { PureComponent } from 'react';

export interface CardProps {
    name: string,
    img: string
}
 
export interface CardState {
    
}
 
class Card extends PureComponent<CardProps, CardState> {
    render() { 
        return ( 
            <div className = {"card"}>
                {/* <img src={this.props.img} alt={this.props.name} /> */}

            </div>
        );
    }
}
 
export default Card;