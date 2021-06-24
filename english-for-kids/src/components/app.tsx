import React, { MouseEvent, PureComponent } from 'react';
import Header from './header';
import SideBar from './side-bar';
import CardsWrapper from './cards-wrapper';
import * as Const from '../models/const'

export interface AppProps {}
 
export interface AppState {
    menuMode?: boolean,
    playMode?:boolean,
    page: string
}
 
class App extends PureComponent<AppProps, AppState> {
    state = {
        menuMode : false,
        playMode : false,
        page: Const.MAIN_PAGE
    }
    render() { 
        return (
            <React.Fragment>
            <div className = {"wrapper"}>
                <SideBar  
                    menuMode = {this.state.menuMode}
                    playMode = {this.state.playMode}
                    clickEvent = {this.pageChangeHandler}
                    page = {this.state.page}
                    />
                <div className = {"mainApp"}>
                    <Header 
                        menuMode = {this.state.menuMode} 
                        playMode = {this.state.playMode}
                        functions = {{play: this.playModeHandler, menu: this.menuModeHandler}}
                        />
                    <CardsWrapper 
                      playMode = {this.state.playMode}
                      page = {this.state.page}
                      clickEvent = {this.pageChangeHandler}
                      />
                </div>
            </div>
            </React.Fragment>
        );
    }

    private menuModeHandler = () => {
        this.setState({menuMode: !this.state.menuMode})
    }

    private playModeHandler = () => {
        this.setState({playMode: !this.state.playMode})
    }

    private pageChangeHandler = (event:MouseEvent) => {
        const target = event.target as HTMLElement;
        if (target.innerText === this.state.page) return;
        this.setState({page: target.innerText})
    }
}
 
export default App;