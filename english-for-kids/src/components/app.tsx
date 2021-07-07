import React, { MouseEvent, Component} from "react";
import {Switch, Route, RouteComponentProps, Redirect } from "react-router-dom";
import { getPageByName } from "../utils/fetch-funstions";

import Header from "./header";
import SideBar from "./side-bar";
import CardsWrapper from "./cards-wrapper";
import Redux from "../models/redux";
import Scope from "./scope";
// import PopUp from "./pop-up";


export interface AppProps extends RouteComponentProps{}

export interface AppState {}

class App extends Component<AppProps, AppState> {
  private menuModeHandler = () => {
    this.setState(Redux.setState("changeMenuMode"));
  };

  private playModeHandler = () => {
    this.setState(Redux.setState("changePlayMode"));
  };

  private pageChangeHandler = async(event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const page = target.innerText === "" ? target.parentElement?.lastElementChild?.innerHTML : target.innerText;
    if (page === Redux.state.page) return;
    if(page === "Hacker scope") {
      this.props.history.push("/scope");
    } else {
      const { id } = await getPageByName(page as string);
      this.props.history.push(`/${id}`);
    }
    this.setState(Redux.setState("changePage", page));
  };

  private handeleRepeat = () => {
    this.props.history.push("/repeat");
    this.setState(Redux.setState("repeatWords"));
  };

  private closeSibeBar = (event:React.MouseEvent) => {
    const TARGET = event.target as HTMLElement;
    if (Redux.state.menuMode && !TARGET.classList.contains("sideBar") && !TARGET.classList.contains("header__hamburger-closed")
      && !TARGET.classList.contains("sideBar__cross")) {
      console.log(TARGET);
      this.setState(Redux.setState("changeMenuMode"));
    }
  }

  render() {
    return (
      <div onClick={this.closeSibeBar}>
          <SideBar funstions={[this.pageChangeHandler, this.menuModeHandler]} />
            <Header
              functions={{
                play: this.playModeHandler,
                menu: this.menuModeHandler,
              }}
            />
            <Redirect from="/" to="/main_page" />
            <Switch> 
              <Route path="/scope" exact component={() => <Scope repeat={this.handeleRepeat}/>}/> 
              <Route 
                path="/:page" 
                component={() => <CardsWrapper clickEvent={this.pageChangeHandler} location={this.props.location.pathname}/>} />
            </Switch>
            <footer className="footer">
              <a className="git" href="https://github.com/MaratkanovaAlexandra">/</a>
              <a className="rss" href="https://rs.school/js/">/</a>
            </footer>
       
        {/* <PopUp /> */}
      </div>
    );
  }
}

export default App;
