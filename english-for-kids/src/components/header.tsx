import React, { MouseEventHandler, PureComponent } from "react";
import Redux from "../models/redux";

export interface HeaderProps {
    functions: { play: Function, menu: Function}
}

export interface HeaderState {}

class Header extends PureComponent<Readonly<HeaderProps>, HeaderState> {
  private getHamburger = () => (Redux.state.menuMode ? "header__hamburger-open" : "header__hamburger-closed")

  private getMode = () => (Redux.state.playMode ? "header__mode-play" : "header__mode-train")

  render() {
    return (
      <header className="header">
        <div
          role="figure"
          className={this.getHamburger()}
          onClick={this.props.functions.menu as MouseEventHandler}
        />
        <div
          role="figure"
          className={this.getMode()}
          onClick={this.props.functions.play as MouseEventHandler}
        />
      </header>
    );
  }
}

export default Header;
