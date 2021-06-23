import React, { PureComponent } from 'react';
import Header from './header';
import SideBar from './side-bar';
import CardsWrapper from './cards-wrapper';

export interface AppProps {
    
}
 
export interface AppState {
    menuMode?: boolean,
    playMode?:boolean
    
}
 
class App extends PureComponent<AppProps, AppState> {
    state = {
        menuMode : false,
        playMode : false
    }
    render() { 
        return (
            <React.Fragment>
            <div className = {"wrapper"}>
                <SideBar  
                    menuMode = {this.state.menuMode}
                    playMode = {this.state.playMode}/>
                <div className = {"mainApp"}>
                    <Header 
                        menuMode = {this.state.menuMode} 
                        playMode = {this.state.playMode}
                        functions = {{play: this.playModeHandler, menu: this.menuModeHandler}}
                        />
                    <CardsWrapper playMode = {this.state.playMode}/>
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
}
 
export default App;