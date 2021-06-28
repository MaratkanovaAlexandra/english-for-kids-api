import React, { MouseEventHandler, PureComponent } from "react";
import Redux from "../models/redux";

export interface CardProps {
  clickEvent: Function | boolean;
  cardClick: Function;
  name: string;
  transl: string | null;
  img: string;
  audio: string | null;
  play: boolean;
  correct: never[];
}

export interface CardState {
  turned: boolean;
}

class Card extends PureComponent<CardProps, CardState> {
  state = {
    turned: false,
  };

  private getCardType = () => {
    if (!this.props.transl) return this.getMainPageCard();
    return this.getBaseCard();
  };

  private getBaseCard = () => (
    <div className={`card ${this.getCorrect(this.props.name)}`} onMouseLeave={this.turnBackHandle}>
      <div role="figure" className={this.getTurnTop} onClick={() => this.props.cardClick(this.props.name, this.props.audio)}>
        <img className="card__img" src={this.props.img} alt={this.props.name} />
        {this.getGameCard()}
      </div>
      <div className={this.getTurnBack}>
        <img className="card__img" src={this.props.img} alt={this.props.name} />
        <p className="card__eng">{this.props.transl}</p>
      </div>
    </div>
  );

  private getGameCard = () => {
    if (!Redux.state.playMode) {
      return (
        <>
          <p className="card__eng">{this.props.name}</p>
          <div role="figure" className="card__turn" onClick={this.turnHandle} />
        </>
      );
    }
    return (
      <>
        <p className="card__eng" />
      </>
    );
  };

  private getMainPageCard = () => (
    <div role="figure" className="card__page" onClick={this.props.clickEvent as MouseEventHandler}>
      <img className="card__circleImg" src={this.props.img} alt={this.props.name} />
      <p className="card__title">{this.props.name}</p>
    </div>
  );

  private getTurnTop = this.state.turned ? "card__top turn_top" : "card__top";

  private getCorrect = (name: string) => (Redux.state.correctCards.includes(name as never) ? " correct" : "");

  private getTurnBack = this.state.turned ? "card__back turn_back" : "card__back";

  private turnHandle = (event: React.MouseEvent) => {
    this.setState({ turned: true });
    event.stopPropagation();
  };

  private turnBackHandle = () => {
    if (this.state.turned) this.setState({ turned: false });
  };

  render() {
    return this.getCardType();
  }
}

export default Card;
