import React, { MouseEvent, Component} from "react";
import {Switch, Route, RouteComponentProps } from "react-router-dom";
import { getPageByName } from "../utils/fetch-funstions";

import Header from "./header";
import SideBar from "./side-bar";
import CardsWrapper from "./cards-wrapper";
import Redux from "../models/redux";
import Scope from "./scope";
// import PopUp from "./pop-up";
// import AdmHeader from "./admin/admin-header";

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
    let resutl: { name: string; wrong: number }[] = [];
    Object.keys(localStorage).forEach((key) => {
      if (typeof localStorage[key] !== "string" || !localStorage[key].includes("wrongClick")) return;
      const STATS = JSON.parse(localStorage[key]);
      if (STATS.wrongClick !== 0) {
        resutl.push({ name: key, wrong: STATS.wrongClick });
      }
    });
    resutl.sort((a, b) => {
      if (a.wrong > b.wrong) {
        return -1;
      }
      if (a.wrong < b.wrong) {
        return 1;
      }
      return 0;
    });
    resutl = resutl.splice(0, 8);
    this.props.history.push("/repear");
    this.setState(Redux.setState("repeatWords", resutl));
  };

  render() {
    return (
      <>
      {/* <AdmHeader /> */}
        <div className="wrapper">
          <SideBar funstions={[this.pageChangeHandler, this.menuModeHandler]} />
          <div className="mainApp">
            <Header
              functions={{
                play: this.playModeHandler,
                menu: this.menuModeHandler,
              }}
            />
            <Switch>
              <Route path="/scope" exact component={() => <Scope repeat={this.handeleRepeat}/>}/> 
              <Route path="/:page" component={() => <CardsWrapper clickEvent={this.pageChangeHandler}/>} />
            </Switch>

            <footer className="footer">
              <a className="git" href="https://github.com/MaratkanovaAlexandra">/</a>
              <a className="rss" href="https://rs.school/js/">/</a>
            </footer>
          </div>
        </div>
        {/* <PopUp /> */}
      </>
    );
  }
}

export default App;
