import React, { MouseEvent, PureComponent } from 'react';
import * as Const from "../models/const" 
import Header from './header';
import SideBar from './side-bar';
import CardsWrapper from './cards-wrapper';
import Redux from './../models/redux';
import Scope from './scope';

export interface AppProps {}
 
export interface AppState {
}
 
class App extends PureComponent<AppProps, AppState> {
    render() { 
        return (
            <React.Fragment>
            <div className = {"wrapper"}>
                <SideBar  
                    funstions = {[this.pageChangeHandler, this.menuModeHandler]}
                    />
                <div className = {"mainApp"}>
                    <Header 
                        functions = {{play: this.playModeHandler, menu: this.menuModeHandler}}
                        />
                    {this.getPage()}
                
                <footer className = {"footer"}>
                    <a className = {"git"} href = {"https://github.com/MaratkanovaAlexandra"}>{""}</a>
                    <a className = {"rss"} href = {"https://rs.school/js/"}>{""}</a>
                </footer>
                </div>
            </div>
            </React.Fragment>
        );
    }

    private menuModeHandler = () => {
        this.setState( Redux.setState("changeMenuMode"));
    }

    private playModeHandler = () => {
        this.setState( Redux.setState("changePlayMode"));  
    }

    private getPage = () => {
        if (Redux.state.page === Const.SCOPE) return  <Scope  repeat = {this.handeleRepeat}/>
        return (
            <CardsWrapper
                      play = {Redux.state.playMode} 
                      page= {Redux.state.page}
                      clickEvent = {this.pageChangeHandler}
                      />
        )
    }

    private pageChangeHandler = (event:MouseEvent) => {
        const target = event.target as HTMLElement;
        const page = target.innerText === "" ? target.parentElement?.lastElementChild?.innerHTML : target.innerText;
        if (page === Redux.state.page) return;
        this.setState(Redux.setState("changePage",page));
    }

    private handeleRepeat = () => {
        let resutl:{name: string, wrong: number}[] = []
        for (const key in localStorage) {
            if (typeof localStorage[key] !== "string") break;
            const STATS = JSON.parse(localStorage[key]);
            if (STATS.wrongClick !== 0) {
                resutl.push({name: key, wrong: STATS.wrongClick});
            }
        }
        resutl.sort((a, b) => {
            if (a.wrong > b.wrong) {
              return -1;
            }
            if (a.wrong < b.wrong) {
              return 1;
            }
            return 0;
        }); 
        resutl = resutl.splice(0,8)
        this.setState(Redux.setState("repeatWords", resutl))
    }
}
 
export default App;