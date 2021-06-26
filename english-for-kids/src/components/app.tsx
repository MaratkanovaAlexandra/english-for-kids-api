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
        if (Redux.state.page === Const.SCOPE) return  <Scope />
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
}
 
export default App;