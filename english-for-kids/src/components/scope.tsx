import React, { MouseEventHandler, PureComponent } from "react";
import PlayCard from "../types/card";

import * as Const from "../models/const";
import { cleanLocalStorage } from "../utils/local-store";
import { fetchCategories } from "../utils/card-searcher";

export interface ScopeProps {
  repeat: Function;
}

export interface ScopeState {
    sort: string,
    categories: { [key: string]: PlayCard[]},
    _isMounted: boolean
}

class Scope extends PureComponent<ScopeProps, ScopeState> {
  state = {
    sort: "",
    categories: {} as { [key: string]: PlayCard[]},
    _isMounted: false
  };

  componentDidMount = async() => {
    this.setState({_isMounted: true});
    const RES = await fetchCategories();
    this.setState({categories: RES});
  }

  private cleanData = () => {
    cleanLocalStorage();
    this.setState({ sort: "reset" });
  };

  private getCategories = (name: string) => {
    if (name === "Main Page") return;
    const CATEGORY = this.getCategory(name);
    if (this.state.sort !== "") this.sortArray(CATEGORY);
    return (
      <div key={name} className="categories">
        <h2 className="categories__title">{name}</h2>
        <div className="category">
          <div className="tableTop">
            <p className={this.getTabletopStyles("word")} onClick={this.sortWords}>word</p>
            <p className={this.getTabletopStyles("translation")} onClick={this.sortWords}>translation</p>
            <p className={this.getTabletopStyles("train clicks")} onClick={this.sortWords}>train clicks</p>
            <p className={this.getTabletopStyles("correct answers")} onClick={this.sortWords}>correct answers</p>
            <p className={this.getTabletopStyles("wrong answers")} onClick={this.sortWords}>wrong answers</p>
            <p className={this.getTabletopStyles("correct answers percent")} onClick={this.sortWords}>correct answers percent</p>
          </div>
          {CATEGORY.map((word) => (
            <div key={word.word} className="categories__item">
              <p className="categories__word">{word.word}</p>
              <p className="categories__word">{word.translation}</p>
              <p className="categories__word">{word["train clicks"]}</p>
              <p className="categories__word">{word["correct answers"]}</p>
              <p className="categories__word">{word["wrong answers"]}</p>
              <p className="categories__word">{word["correct answers percent"]}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  private getTabletopStyles = (text: string) => (text === this.state.sort ? "tableTop__item selected" : "tableTop__item")

  private getPercent = (name: string) => {
    const STATS = JSON.parse(localStorage[`${name}`]);
    const ALL_ANSWERS = STATS.correctClick + STATS.wrongClick;
    if (ALL_ANSWERS === 0) return "0%";
    const RESULT = (STATS.correctClick / ALL_ANSWERS) * 100;
    return RESULT % 100 === 0 ? `${RESULT}%` : `${RESULT.toFixed(2)}%`;
  };

  private sortWords = (event: React.MouseEvent) => {
    const TEXT = (event.target as HTMLElement).innerText;
    if (TEXT === this.state.sort) {
      this.setState({ sort: "" });
      return;
    }
    this.setState({ sort: TEXT });
  };

  private getCategory = (element: string) => {
    const WORDS = this.state.categories[element];
    const RESULT: { [key: string]: string | number }[] = [];

    WORDS.forEach((word) => {
      const STATS = JSON.parse(localStorage[`${word.name}`]);
      const ITEM: { [key: string]: string | number } = {
        word: word.name,
        translation: word.transl as string,
        "train clicks": STATS.trainClick,
        "correct answers": STATS.correctClick,
        "wrong answers": STATS.wrongClick,
        "correct answers percent": this.getPercent(word.name),
      };
      RESULT.push(ITEM);
    });
    return RESULT;
  };

  private sortArray = (array: { [key: string]: string | number }[]) => {
    array.sort((a, b) => {
      if (a[this.state.sort] > b[`${this.state.sort}`]) {
        return 1;
      }
      if (a[`${this.state.sort}`] < b[`${this.state.sort}`]) {
        return -1;
      }
      return 0;
    });
  };

  render() {
    return (
      <>
        <div className="buttons">
          <button type="button" className="repeat-button" onClick={this.props.repeat as MouseEventHandler}>
            {Const.REPEAT}
          </button>
          <button type="button" className="reset-button" onClick={this.cleanData}>
            {Const.RESET}
          </button>
        </div>
        {Object.keys(this.state.categories).map((element) => this.getCategories(element))}
      </>
    );
  }
}

export default Scope;
