import React, { MouseEventHandler, PureComponent } from "react";
import * as Const from "../models/const";
import Redux from "../models/redux";
import Page from "../types/page";
import { getPages } from "../utils/fetch-funstions";

export interface SideBarProps {
  funstions: Function[];
}

export interface SideBarState {
  pages: Page[],
  _isMounted: boolean
}

class SideBar extends PureComponent<SideBarProps, SideBarState> {
  state = {
    pages: [] as Page[],
    _isMounted: false
  }

  componentDidMount = async() => {
    this.setState({_isMounted: true});
    const RES = await getPages();
    this.setState({pages: RES});
  }

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
          {this.state.pages.map((page) => <li key={page.id} className={this.getItemStyle(page.page)}>{page.page}</li>) }
          <li className={this.getItemStyle(Const.SCOPE)}>{Const.SCOPE}</li>
        </ul>
        <button type="button" className="login_button">{Const.LOGIN}</button>
      </div>
    );
  }
}

export default SideBar;
