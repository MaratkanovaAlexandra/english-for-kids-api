import React, { MouseEventHandler, PureComponent } from "react";

import PlayCard from "../types/card";
import Card from "./card";
import * as Const from "../models/const";
import Redux from "../models/redux";
import playAudio from "../utils/audio";
import { getCards } from "../utils/fetch-funstions";
import { findRepeatCards } from "../utils/card-searcher";

export interface CardsWrapperProps {
  location: string,
  clickEvent: Function
}

export interface CardsWrapperState {}

// Вoобщем я тут придумала какой-то странный костыль :( не суди строго
let path = "";
let saveCards: PlayCard[] = [];

class CardsWrapper extends PureComponent<CardsWrapperProps, CardsWrapperState> {
  state = {
    cards: [] as PlayCard[],
    _isMounted: false
  }

  componentDidMount = async() => {
    if (this.props.location === path) {
      this.setState({cards: saveCards});
      return;
    }
    if (this.props.location === "/repeat") {
      const RES = await findRepeatCards();
      this.setState({cards: RES});
      path = this.props.location;
      saveCards = RES;
      return;
    }
    const RES = await getCards(this.props.location);
    this.setState({cards: RES});
    path = this.props.location;
    saveCards = RES;
  }

  private getPlayButton = () => {
    if (!Redux.state.playMode) return null;
    if (Redux.state.game) {
      return (
        <button
          type="button"
          className="playButton__repeat"
          onClick={this.playButtonClick}
        />
      );
    }
    return (
      <button type="button" className="playButton__start" onClick={this.playButtonClick}>
        {Const.START}
      </button>
    );
  };

  private getPoint = (point: { id: number; correct: boolean }) => {
    if (point.correct) return <div key={point.id} className="star fill" />;
    return <div key={point.id} className="star no-fill" />;
  };

  private playButtonClick = () => {
    if (Redux.state.page === Const.MAIN_PAGE) return;
    if (!Redux.state.game) {
      this.setState(Redux.setState("changeGameMode", this.state.cards));
      return;
    }
    playAudio(Redux.state.cardPlaing.sound);
  };

  private cardClick = (name: string, audio: string) => {
    if (Redux.state.playMode) {
      if (Redux.state.game) {
        this.setState(Redux.setState("changeCard", name));
        return;
      }
      return;
    }
    playAudio(audio);
    const STATS = JSON.parse(localStorage[`${name}`]);
    STATS.trainClick += 1;
    localStorage.setItem(`${name}`, JSON.stringify(STATS));
  };

  render() {
    return (
      <>
        <div className="cardWrapper">
          {this.state.cards.map((card) => (
            <Card
              key={card.name}
              play={Redux.state.playMode}
              name={card.name}
              img={card.img}
              transl={card.transl}
              audio={card.sound}
              clickEvent={
                !card.transl && (this.props.clickEvent as MouseEventHandler)
              }
              cardClick={this.cardClick}
              correct={Redux.state.correctCards}
            />
          ))}
        </div>
        <div className="answers">
          {Redux.state.answers.map((star) => this.getPoint(star))}
        </div>
        {this.getPlayButton()}
        <div className="complImage" />
      </>
    );
  }
}

export default CardsWrapper;
