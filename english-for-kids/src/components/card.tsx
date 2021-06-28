import React, { MouseEventHandler, PureComponent } from "react";
import Redux from "./../models/redux";

export interface CardProps {
    clickEvent: Function | boolean,
    cardClick: Function,
    name: string,
    transl: string|null,
    img: string,
    audio: string|null,
    play: boolean,
    correct: never[]
}
 
export interface CardState {
    turned: boolean
}
 
class Card extends PureComponent<CardProps, CardState> {
    state = {
        turned: false
    }
    render() { 
        return this.getCardType();
    }

    private getCardType = () => {
        if (!this.props.transl) return this.getMainPageCard();
        return this.getBaseCard();
    }

    private getBaseCard = () => {
        return ( 
            <div className = {"card"+this.getCorrect(this.props.name)} onMouseLeave = {this.turnBackHandle} >
                <div className = {this.getTurnTop()} 
                     onClick = {() => this.props.cardClick(this.props.name, this.props.audio)}>
                    <img className = {"card__img"} src={this.props.img} alt={this.props.name} />
                    {this.getGameCard()}
                </div>
                <div className = {this.getTurnBack()}>
                    <img className = {"card__img"} src={this.props.img} alt={this.props.name} />
                    <p className = {"card__eng"}>{this.props.transl}</p>
                </div>
            </div>
        );
    }

    private getGameCard = () => {
        if(!Redux.state.playMode) return (
            <React.Fragment>
                <p className = {"card__eng"}>{this.props.name}</p>
                <div className = {"card__turn"}
                onClick = {this.turnHandle}></div>
            </React.Fragment>
        );

        return (
            <React.Fragment>
                <p className = {"card__eng"}>{""}</p>
            </React.Fragment> 
        );
    }

    private getMainPageCard = () => {
        return ( 
            <div className = {"card__page"}
                 onClick = {this.props.clickEvent as MouseEventHandler}>
                <img className = {"card__circleImg"} src={this.props.img} alt={this.props.name} />
                <p className = {"card__title"}>{this.props.name}</p>
            </div>
        ); 
    }

    private getTurnTop = () => {
        const styles = "card__top";
        return this.state.turned? styles + " turn_top" : styles + "";
    }

    private getCorrect = (name: string) => {
        return Redux.state.correctCards.includes(name as never)? " correct": "";
    }

    private getTurnBack = () => {
        const styles = "card__back";
        return this.state.turned? styles + " turn_back" : styles + "";
    }

    private turnHandle= (event: React.MouseEvent) => {
        this.setState({turned: true});
        event.stopPropagation();
    }

    private turnBackHandle= () => {
        if (this.state.turned) this.setState({turned: false});
    }
}
 
export default Card;