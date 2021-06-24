import React, { PureComponent } from 'react';

export interface CardProps {
    playMode: boolean,
    name: string,
    transl?: string|null,
    img: string
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
            <div className = {"card"} onMouseLeave = {this.turnBackHandle}>
                <div className = {this.getTurnTop()}>
                    <img className = {"card__img"} src={this.props.img} alt={this.props.name} />
                    <p className = {"card__eng"}>{this.props.name}</p>
                    <div className = {"card__turn"}
                         onClick = {this.turnHandle}></div>
                </div>
                <div className = {this.getTurnBack()}>
                    <img className = {"card__img"} src={this.props.img} alt={this.props.name} />
                    <p className = {"card__eng"}>{this.props.transl}</p>
                </div>
            </div>
        );
    }

    private getMainPageCard = () => {
        return ( 
            <div className = {"card__page"}>
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

    private getTurnTop = () => {
        const styles = "card__top";
        return this.state.turned? styles + " turn_top" : styles + "";
    }

    private getTurnBack = () => {
        const styles = "card__back";
        return this.state.turned? styles + " turn_back" : styles + "";
    }

    private turnHandle= () => {
        this.setState({turned: true});
    }

    private turnBackHandle= () => {
        if (this.state.turned) this.setState({turned: false});
    }
}
 
export default Card;