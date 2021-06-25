import React, { MouseEvent, PureComponent } from 'react';
import Header from './header';
import SideBar from './side-bar';
import CardsWrapper from './cards-wrapper';
import Redux from './../models/redux';

export interface AppProps {}
 
export interface AppState {
}
 
class App extends PureComponent<AppProps, AppState> {
    render() { 
        console.log(this.state)
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
                    <CardsWrapper
                    play = {Redux.state.playMode} 
                      page= {Redux.state.page}
                      clickEvent = {this.pageChangeHandler}
                      />
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

    private pageChangeHandler = (event:MouseEvent) => {
        const target = event.target as HTMLElement;
        const page = target.innerText === "" ? target.parentElement?.lastElementChild?.innerHTML : target.innerText;
        if (page === Redux.state.page) return;
        this.setState(Redux.setState("changePage",page));
    }
}
 
export default App;