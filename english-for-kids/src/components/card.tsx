import React, { PureComponent } from 'react';

export interface CardProps {
    playMode: boolean,
    name: string,
    transl?: string|null,
    img: string
}
 
export interface CardState {
    
}
 
class Card extends PureComponent<CardProps, CardState> {
    render() { 
        return this.getCardType();
    }

    private getCardType = () => {
        if (!this.props.transl) return this.getMainPageCard();
        return this.getBaseCard();
    }

    private getBaseCard = () => {
        return ( 
            <div className = {"card"}>
                <div className = {"card__top"}>
                    <img className = {"card__img"} src={this.props.img} alt={this.props.name} />
                    <p className = {"card__eng"}>{this.props.name}</p>
                </div>
                <div className = {"card__back"}>
                    <img className = {"card__img"} src={this.props.img} alt={this.props.name} />
                    <p className = {"card__eng"}>{this.props.transl}</p>
                </div>
            </div>
        );
    }

    private getMainPageCard = () => {
        return ( 
            <div className = {"card"}>
                <div className = {this.getBackgroundColor()}></div>
                <img className = {"card__circleImg"} src={this.props.img} alt={this.props.name} />
                <p className = {"card__title"}>{this.props.name}</p>
            </div>
        ); 
    }

    private getBackgroundColor = () => {
        let styles = "card__background ";
        return this.props.playMode ? styles + "play" : styles + "train";
    }
}
 
export default Card;