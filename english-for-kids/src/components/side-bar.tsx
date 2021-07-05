import React, { MouseEventHandler, PureComponent } from "react";
// import { getPageByName } from "../utils/fetch-funstions";
// import { Link } from "react-router-dom";
import * as Const from "../models/const";
import Redux from "../models/redux";

export interface SideBarProps {
  funstions: Function[];
}

export interface SideBarState {}

class SideBar extends PureComponent<SideBarProps, SideBarState> {
  private cross = (
    <div
      role="figure"
      className="sideBar__cross"
      onClick={this.props.funstions[1] as MouseEventHandler}
    />)

  private getState = () => (Redux.state.menuMode ? "sideBar open " : "sideBar closed ")

  private getPlayMode = () => (Redux.state.playMode ? "play" : "train")

  private getItemStyle = (name: string) => (name === Redux.state.page ? "sideBar__item choosen" : "sideBar__item");

  render() {
    const { funstions } = this.props;
    return (
      <div className={this.getState() + this.getPlayMode()}>
        {this.cross}
        <ul
          className="sideBar__items"
          onClick={funstions[0] as MouseEventHandler}
        >
          <li className={this.getItemStyle(Const.MAIN_PAGE)}>{Const.MAIN_PAGE}</li>
          <li className={this.getItemStyle(Const.ACTION_A)}>{Const.ACTION_A}</li>
          <li className={this.getItemStyle(Const.ACTION_B)}>{Const.ACTION_B}</li>
          <li className={this.getItemStyle(Const.ACTION_C)}>{Const.ACTION_C}</li>
          <li className={this.getItemStyle(Const.ADJECTIVE)}>{Const.ADJECTIVE}</li>
          <li className={this.getItemStyle(Const.ANIMAL_A)}>{Const.ANIMAL_A}</li>
          <li className={this.getItemStyle(Const.ANIMAL_B)}>{Const.ANIMAL_B}</li>
          <li className={this.getItemStyle(Const.CLOTHES)}>{Const.CLOTHES}</li>
          <li className={this.getItemStyle(Const.EMOTION)}>{Const.EMOTION}</li>
          <li className={this.getItemStyle(Const.SCOPE)}>{Const.SCOPE}</li>
        </ul>
        <button type="button" className="login_button">{Const.LOGIN}</button>
      </div>
    );
  }
}

export default SideBar;
